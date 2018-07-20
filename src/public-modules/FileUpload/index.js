const initialState = {
  uploading: true,
  uploaded: false,
  error: false,
  file: []
};

const UPLOAD_FILE = 'fileUpload/UPLOAD_FILE';
const UPLOAD_FILE_SUCCESS = 'fileUpload/UPLOAD_FILE_SUCCESS';
const UPLOAD_FILE_FAIL = 'fileUpload/UPLOAD_FILE_FAIL';

function uploadFile(filename, reader) {
  return { type: UPLOAD_FILE, filename, reader };
}

function uploadFileSuccess(file) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    file
  };
}

function uploadFileFail(error) {
  return { type: UPLOAD_FILE_FAIL, error };
}

function FileUploadReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_FILE: {
      return {
        ...state,
        uploading: true,
        uploaded: false,
        error: false
      };
    }
    case UPLOAD_FILE_SUCCESS: {
      const { file } = action;
      console.log(file);

      return {
        ...state,
        uploading: false,
        uploaded: true,
        error: false,
        file
      };
    }
    case UPLOAD_FILE_FAIL: {
      return {
        ...state,
        uploading: false,
        uploaded: true,
        error: true
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
