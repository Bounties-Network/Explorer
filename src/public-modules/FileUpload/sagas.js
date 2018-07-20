import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/FileUpload';
import { IPFS_OPTIONS } from './constants.js';

import ipfsAPI from 'ipfs-api';

const ipfsNew = ipfsAPI(IPFS_OPTIONS);

const { UPLOAD_FILE } = actionTypes;
const { uploadFileFail, uploadFileSuccess } = actions;

export function* uploadFile(action) {
  const { filename, reader } = action;
  const buffer = Buffer.from(reader.result);
  try {
    const upload = yield call(ipfsNew.add, [
      { path: '/bounties/' + filename, content: buffer }
    ]);
    yield put(uploadFileSuccess(upload));
  } catch (e) {
    yield put(uploadFileFail(e));
  }
}

export function* watchUpload() {
  yield takeLatest(UPLOAD_FILE, uploadFile);
}

export default [watchUpload];
