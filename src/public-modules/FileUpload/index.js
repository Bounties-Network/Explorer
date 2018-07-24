const initialState = {
  uploading: true,
  uploaded: false,
  error: false
};

const UPLOAD_FILE = 'fileUpload/UPLOAD_FILE';
const UPLOAD_FILE_SUCCESS = 'fileUpload/UPLOAD_FILE_SUCCESS';
const UPLOAD_FILE_FAIL = 'fileUpload/UPLOAD_FILE_FAIL';

function uploadFile(key, file) {
  return { type: UPLOAD_FILE, key, file };
}

function uploadFileSuccess(key, hash) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    hash,
    key
  };
}

function uploadFileFail(key, error) {
  return { type: UPLOAD_FILE_FAIL, key, error };
}

function FileUploadReducer(state = {}, action) {
  switch (action.type) {
    case UPLOAD_FILE: {
      const { key } = action;

      return {
        ...state,
        [key]: { ...initialState }
      };
    }
    case UPLOAD_FILE_SUCCESS: {
      const { key, file } = action;

      return {
        ...state,
        [key]: {
          ...state[key],
          uploading: false,
          uploaded: true
        }
      };
    }
    case UPLOAD_FILE_FAIL: {
      const { key } = action;

      return {
        ...state,
        [key]: {
          ...state[key],
          uploading: false,
          error: true
        }
      };
    }
    default:
      return state;
  }
}

export const actions = {
  uploadFile,
  uploadFileSuccess,
  uploadFileFail
};

export const actionTypes = {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAIL
};

export default FileUploadReducer;
