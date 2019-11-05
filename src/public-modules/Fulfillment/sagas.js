import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Fulfillment';
import { actions as transactionActions } from 'public-modules/Transaction';
import { addressSelector } from 'public-modules/Client/selectors';
import { addJSON } from 'public-modules/Utilities/ipfsClient';
import siteConfig from 'public-modules/config';
import {
  promisifyContractCall,
  promisifyContractEstimateGasCall
} from 'public-modules/Utilities/helpers';
import { getContractClient, getWeb3Client } from 'public-modules/Client/sagas';

const {
  setPendingWalletConfirm,
  setTransactionError,
  setPendingReceipt
} = transactionActions;

const {
  LOAD_FULFILLMENT,
  CREATE_FULFILLMENT,
  UPDATE_FULFILLMENT,
  ACCEPT_FULFILLMENT
} = actionTypes;

const {
  loadFulfillmentSuccess,
  loadFulfillmentFail,
  createFulfillmentSuccess,
  createFulfillmentFail,
  updateFulfillmentSuccess,
  updateFulfillmentFail,
  acceptFulfillmentSuccess,
  acceptFulfillmentFail
} = actions;

export function* loadFulfillment(action) {
  const { bountyId, fulfillmentId } = action;
  const params = {
    bounty: bountyId,
    fulfillment_id: fulfillmentId
  };

  try {
    let endpoint = 'fulfillment/';
    const fulfillments = yield call(request, endpoint, 'GET', { params });
    yield put(loadFulfillmentSuccess(fulfillments.results[0]));
  } catch (e) {
    yield put(loadFulfillmentFail(e));
  }
}

export function* acceptFulfillment(action) {
  const {
    bountyId,
    contract_version,
    fulfillmentId,
    approverId,
    tokenAmounts
  } = action;

  yield put(setPendingWalletConfirm());

  const userAddress = yield select(addressSelector);
  yield call(getWeb3Client);

  const { standardBounties } = yield call(getContractClient, contract_version);
  try {
    let txHash;
    if (contract_version === '1') {
      txHash = yield call(
        promisifyContractCall(standardBounties.acceptFulfillment, {
          from: userAddress
        }),
        bountyId,
        fulfillmentId
      );
    } else if (
      typeof contract_version === 'string' &&
      contract_version.split('.')[0] === '2'
    ) {
      txHash = yield call(
        promisifyContractCall(standardBounties.acceptFulfillment, {
          from: userAddress
        }),
        userAddress,
        bountyId,
        fulfillmentId,
        approverId,
        tokenAmounts
      );
    } else {
      throw new Error(`contract version ${contract_version} invalid.`);
    }

    yield put(setPendingReceipt(txHash));
    yield put(acceptFulfillmentSuccess());
  } catch (e) {
    console.log(e);
    yield put(setTransactionError(e.message));
    yield put(acceptFulfillmentFail());
  }
}

export function* createFulfillment(action) {
  const { bountyId, contract_version, bountyPlatform, data } = action;
  const {
    name,
    email,
    url,
    description,
    fileName,
    ipfsHash: fulfillmentDataHash
  } = data;

  yield put(setPendingWalletConfirm());

  const userAddress = yield select(addressSelector);
  const { web3 } = yield call(getWeb3Client);
  const payload = {
    payload: {
      url,
      description,
      sourceFileName: fileName,
      sourceDirectoryHash: fulfillmentDataHash,
      sourceFileHash: '',
      fulfiller: {
        email,
        userAddress,
        name
      }
    },
    meta: {
      platform: bountyPlatform,
      schemaVersion: siteConfig.postingSchemaVersion,
      schemaName: siteConfig.postingSchema
    }
  };

  const ipfsHash = yield call(addJSON, payload);

  const { standardBounties, relayer } = yield call(
    getContractClient,
    contract_version
  );

  try {
    let txHash;
    if (contract_version === '1') {
      txHash = yield call(
        promisifyContractCall(standardBounties.fulfillBounty, {
          from: userAddress
        }),
        bountyId,
        ipfsHash
      );
    } else if (
      typeof contract_version === 'string' &&
      contract_version.split('.')[0] === '2'
    ) {
      const accountbalanceWei = yield call(web3.eth.getBalance, userAddress);
      const fulfillEstimateGasCost = yield call(
        promisifyContractEstimateGasCall(standardBounties.fulfillBounty, {
          from: userAddress
        }),
        userAddress,
        bountyId,
        [userAddress],
        ipfsHash
      );
      // console.log(fulfillEstimateGasCost);
      // console.log(accountbalanceWei);
      if (
        contract_version == '2.2' &&
        fulfillEstimateGasCost + 50000 > accountbalanceWei
      ) {
        // Use meta transaction relayer, user does not have enough funds
        const sender = web3.utils.toChecksumAddress(userAddress);
        const fulfillers = [sender];
        const latestNonce = yield relayer.methods.replayNonce(sender).call();
        // console.log(relayer);
        // console.log("latestNonce from meta tx contract: ", latestNonce);
        const nonce = web3.utils.hexToNumber(latestNonce);
        // console.log(siteConfig);
        // console.log(
        //   siteConfig[
        //     `relayer${
        //       process.env.APP_SETTINGS_FILE === "rinkeby_settings" ||
        //       process.env.APP_SETTINGS_FILE === "staging_settings"
        //         ? "Staging"
        //         : "Production"
        //     }ContractAddress`
        //   ]
        // );
        // window.config = siteConfig;
        const params = [
          ['address', 'string', 'uint', 'address[]', 'string', 'uint'],
          [
            web3.utils.toChecksumAddress(relayer._address),
            'metaFulfillBounty',
            bountyId,
            fulfillers,
            ipfsHash,
            nonce
          ]
        ];
        // console.log(params);
        let paramsHash = web3.utils.keccak256(
          web3.eth.abi.encodeParameters(...params)
        );
        // console.log("Params hash1", paramsHash);
        // paramsHash = web3.utils.soliditySha3("\x19Ethereum Signed Message:\n32", paramsHash);
        // console.log("Params hash", paramsHash);
        let signature = yield web3.eth.personal.sign(paramsHash, sender, '');
        // console.log(signature);
        let signer = web3.eth.accounts.recover(paramsHash, signature);
        // console.log("Is that equal?", sender, signer);
        const data = {
          sender,
          method: 'metaFulfillBounty',
          params,
          signature,
          contract_version
        };
        const relayResponse = yield call(
          request,
          `${siteConfig.relayerApiURL}/relay`,
          'POST',
          {
            data,
            withCredentials: null
          }
        );
        if (relayResponse.message && relayResponse.message.includes('quota')) {
          // ({"status":400,"message":"You have reached the limited quota for RelayedTx. Try again later."})
          throw new Error(relayResponse.message);
        } else if (
          relayResponse.message &&
          relayResponse.message.toLowerCase().includes('error')
        ) {
          // {"status":500,"message":"ERROR while relaying method ..."}
          throw new Error(relayResponse.message);
        }
        txHash = relayResponse.txHash;
        // console.log(txHash);
      } else {
        // Use normal web3 provider
        txHash = yield call(
          promisifyContractCall(standardBounties.fulfillBounty, {
            from: userAddress
          }),
          userAddress,
          bountyId,
          [userAddress],
          ipfsHash
        );
      }
    } else {
      throw new Error(`contract version ${contract_version} invalid`);
    }

    yield put(setPendingReceipt(txHash));
    yield put(createFulfillmentSuccess());
  } catch (e) {
    console.error(e);
    yield put(setTransactionError(e.message));
    yield put(createFulfillmentFail());
  }
}

export function* updateFulfillment(action) {
  const { bountyId, contract_version, bountyPlatform, data } = action;
  const {
    name,
    email,
    url,
    description,
    fileName,
    ipfsHash: fulfillmentDataHash,
    fulfillmentId
  } = data;

  yield put(setPendingWalletConfirm());

  const userAddress = yield select(addressSelector);
  const { web3 } = yield call(getWeb3Client);
  const payload = {
    payload: {
      url,
      description,
      sourceFileName: fileName,
      sourceDirectoryHash: fulfillmentDataHash,
      sourceFileHash: '',
      fulfiller: {
        email,
        userAddress,
        name
      }
    },
    meta: {
      platform: bountyPlatform,
      schemaVersion: siteConfig.postingSchemaVersion,
      schemaName: siteConfig.postingSchema
    }
  };

  const ipfsHash = yield call(addJSON, payload);

  const { standardBounties, relayer } = yield call(
    getContractClient,
    contract_version
  );

  try {
    let txHash;
    if (
      typeof contract_version === 'string' &&
      contract_version.split('.')[0] === '2'
    ) {
      // Check if user has enough balance for transaction gas costs
      const accountbalanceWei = yield call(web3.eth.getBalance, userAddress);
      const fulfillEstimateGasCost = yield call(
        promisifyContractEstimateGasCall(standardBounties.updateFulfillment, {
          from: userAddress
        }),
        userAddress,
        bountyId,
        fulfillmentId,
        [userAddress],
        ipfsHash
      );

      if (
        contract_version == '2.2' &&
        fulfillEstimateGasCost + 50000 > accountbalanceWei
      ) {
        const sender = web3.utils.toChecksumAddress(userAddress);
        const latestNonce = yield relayer.methods.replayNonce(sender).call();
        // console.log(relayer);
        // console.log("latestNonce from meta tx contract: ", latestNonce);
        const nonce = web3.utils.hexToNumber(latestNonce);
        const params = [
          ['address', 'string', 'uint', 'uint', 'address[]', 'string', 'uint'],
          [
            web3.utils.toChecksumAddress(relayer._address),
            'metaUpdateFulfillment',
            bountyId,
            fulfillmentId,
            [userAddress],
            ipfsHash,
            nonce
          ]
        ];

        let paramsHash = web3.utils.keccak256(
          web3.eth.abi.encodeParameters(...params)
        );
        // console.log("Params hash1", paramsHash);
        // paramsHash = web3.utils.soliditySha3("\x19Ethereum Signed Message:\n32", paramsHash);
        // console.log("Params hash", paramsHash);
        let signature = yield web3.eth.personal.sign(paramsHash, sender, '');
        // console.log(signature);
        let signer = web3.eth.accounts.recover(paramsHash, signature);
        // console.log("Is that equal?", sender, signer);
        const data = {
          sender,
          method: 'metaUpdateFulfillment',
          params,
          signature,
          contract_version
        };
        const relayResponse = yield call(
          request,
          `${siteConfig.relayerApiURL}/relay`,
          'POST',
          {
            data,
            withCredentials: null
          }
        );
        if (
          relayResponse.message &&
          relayResponse.message.toLowerCase().includes('quota')
        ) {
          // ({"status":400,"message":"You have reached the limited quota for RelayedTx. Try again later."})
          throw new Error(relayResponse.message);
        } else if (
          relayResponse.message &&
          relayResponse.message.toLowerCase().includes('error')
        ) {
          // {"status":500,"message":"ERROR while relaying method \"metaUpdateFulfillment\""}
          throw new Error(relayResponse.message);
        }
        txHash = relayResponse.txHash;
      } else {
        txHash = yield call(
          promisifyContractCall(standardBounties.updateFulfillment, {
            from: userAddress
          }),
          userAddress,
          bountyId,
          fulfillmentId,
          [userAddress],
          ipfsHash
        );
      }
    } else {
      throw new Error(`contract version ${contract_version} invalid`);
    }

    yield put(setPendingReceipt(txHash));
    yield put(updateFulfillmentSuccess());
  } catch (e) {
    console.log(e);
    yield put(setTransactionError(e.message));
    yield put(updateFulfillmentFail());
  }
}
export function* watchFulfillment() {
  yield takeLatest(LOAD_FULFILLMENT, loadFulfillment);
}

export function* watchAcceptFulfillment() {
  yield takeLatest(ACCEPT_FULFILLMENT, acceptFulfillment);
}

export function* watchCreateFulfillment() {
  yield takeLatest(CREATE_FULFILLMENT, createFulfillment);
}

export function* watchUpdateFulfillment() {
  yield takeLatest(UPDATE_FULFILLMENT, updateFulfillment);
}

export default [
  watchFulfillment,
  watchAcceptFulfillment,
  watchCreateFulfillment,
  watchUpdateFulfillment
];
