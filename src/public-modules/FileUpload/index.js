const initialState = {
  uploading: false,
  uploaded: false,
  error: false,
  ipfsHash: '',
  fileName: ''
};

const UPLOAD_FILE = 'fileUpload/UPLOAD_FILE';
const UPLOAD_FILE_SUCCESS = 'fileUpload/UPLOAD_FILE_SUCCESS';
const UPLOAD_FILE_FAIL = 'fileUpload/UPLOAD_FILE_FAIL';
const RESET_UPLOAD = 'fileUpload/RESET_UPLOAD';
const DELETE_UPLOAD_KEY = 'fileUpload/DELETE_UPLOAD_KEY';

function uploadFile(key, file) {
  return { type: UPLOAD_FILE, key, file };
}

function uploadFileSuccess(key, hash, fileName = 'undefined') {
  return {
    type: UPLOAD_FILE_SUCCESS,
    key,
    hash,
    fileName
  };
}

function uploadFileFail(key, error) {
  return { type: UPLOAD_FILE_FAIL, key, error };
}

function resetUpload(key) {
  return { type: RESET_UPLOAD, key };
}

function deleteUploadKey(key) {
  return { type: DELETE_UPLOAD_KEY, key };
}

function FileUploadReducer(state = {}, action) {
  switch (action.type) {
    case UPLOAD_FILE: {
      const { key } = action;

      return {
        ...state,
        [key]: {
          ...initialState,
          uploading: true
        }
      };
    }
    case UPLOAD_FILE_SUCCESS: {
      const { key, hash, fileName } = action;

      return {
        ...state,
        [key]: {
          ...state[key],
          uploading: false,
          uploaded: true,
          ipfsHash: hash,
          fileName: fileName
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
    case RESET_UPLOAD: {
      const { key } = action;

      return {
        ...state,
        [key]: {
          ...initialState
        }
      };
    }
    case DELETE_UPLOAD_KEY: {
      const { key } = action;
      return {
        ...state,
        [key]: null
      };
    }
    default:
      return state;
  }
}

export const actions = {
  uploadFile,
  uploadFileSuccess,
  uploadFileFail,
  resetUpload,
  deleteUploadKey
};

export const actionTypes = {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAIL,
  RESET_UPLOAD,
  DELETE_UPLOAD_KEY
};

export default FileUploadReducer;
