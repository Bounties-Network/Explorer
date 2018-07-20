import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { promisify } from 'public-modules/Utilities/helpers';
import { actionTypes, actions } from 'public-modules/Bounty';
import { actions as transactionActions } from 'public-modules/Transaction';
import { getContractClients } from 'public-modules/Client/sagas';

const { LOAD_BOUNTY, EXTEND_DEADLINE } = actionTypes;
const {
  loadBountyFail,
  loadBountySuccess,
  extendDeadlineFail,
  extendDeadlineSuccess
} = actions;

const { setTransaction } = transactionActions;

// Load single Bounty, needs ID
export function* loadBounty(action) {
  const { id } = action;
  try {
    let endpoint = `bounty/${id}`;
    const bounty = yield call(request, endpoint, 'GET');
    yield put(loadBountySuccess(bounty));
  } catch (e) {
    yield put(loadBountyFail(e));
  }
}

export function* extendDeadline(action) {
  const { id, deadline } = action;
  try {
    const clients = call(getContractClients);
    const transaction = yield call(
      promisify(cb => clients.standardBounties.extendDeadline(id, deadline))
    );

    // need to call setTransaction for every web3 interaction
    yield put(setTransaction(transaction));
    yield put(extendDeadlineSuccess());
  } catch (e) {
    yield put(extendDeadlineFail(e));
  }
}

export function* watchBounty() {
  yield takeLatest(LOAD_BOUNTY, loadBounty);
}

export function* watchExtendDeadline() {
  yield takeLatest(EXTEND_DEADLINE, extendDeadline);
}

export default [watchBounty, watchExtendDeadline];
