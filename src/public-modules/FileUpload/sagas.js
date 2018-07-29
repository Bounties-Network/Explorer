import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/FileUpload';
import { readFile } from 'public-modules/Utilities/helpers';
import { addBufferToIPFS } from 'public-modules/Utilities/ipfsClient';
import { Buffer } from 'buffer';

const { UPLOAD_FILE } = actionTypes;
const { uploadFileFail, uploadFileSuccess } = actions;

export function* uploadFile(action) {
  const { file, key } = action;
  const reader = yield call(readFile, file);
  const buffer = Buffer.from(reader.result);
  try {
    const ipfsHash = yield call(addBufferToIPFS, file.name, buffer);
    yield put(uploadFileSuccess(key, ipfsHash));
  } catch (e) {
    yield put(uploadFileFail(key, e));
  }
}

export function* watchUpload() {
  yield takeLatest(UPLOAD_FILE, uploadFile);
}

export default [watchUpload];
