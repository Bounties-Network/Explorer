import request from 'utils/request';
import moment from 'moment';
import config from 'public-modules/config';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Settings';
import { actions as transactionActions } from 'public-modules/Transaction';
import { calculateDecimals } from 'public-modules/Utilities/helpers';
import { map } from 'lodash';
import { addJSON } from 'public-modules/Utilities/ipfsClient';
import {
  addressSelector,
  networkSelector
} from 'public-modules/Client/selectors';
import {
  getContractClient,
  getWeb3Client,
  getTokenClient
} from 'public-modules/Client/sagas';

const { SAVE_SETTINGS } = actionTypes;
const { saveSettingsSuccess, saveSettingsFail } = actions;

const { setTransaction } = transactionActions;

export function* saveSettings(action) {
  console.log(action);

  const { values } = action;
  const {
    name,
    email,
    languages,
    organization,
    skills,
    website,
    twitter,
    github,
    linkedin
  } = values;

  const userAddress = yield select(addressSelector);
  const { web3 } = yield call(getWeb3Client);

  const settings = {
    name,
    email,
    languages: map(l => l.trim(), languages.split(',')),
    organization,
    skills,
    social: {
      personalWebsite: website,
      github,
      twitter,
      linkedin
      //dribbble: string
    },
    profilePhoto: {
      fileDirectoryHash: '',
      fileName: ''
    }
  };

  const ipfsHash = yield call(addJSON, settings);

  const { ethProfiles } = yield call(getContractClient);
  try {
    yield call(ethProfiles.addProfile(ipfsHash).send, { from: userAddress });
    yield put(saveSettingsSuccess());
  } catch (e) {
    console.log(e);
    yield put(saveSettingsFail());
  }
}

export function* watchSaveSettings() {
  yield takeLatest(SAVE_SETTINGS, saveSettings);
}

export default [watchSaveSettings];
