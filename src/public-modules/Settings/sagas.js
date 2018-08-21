import request from 'utils/request';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Settings';
import { actions as transactionActions } from 'public-modules/Transaction';
import { addJSON } from 'public-modules/Utilities/ipfsClient';
import { addressSelector } from 'public-modules/Client/selectors';
import { getContractClient, getWeb3Client } from 'public-modules/Client/sagas';
import { promisifyContractCall } from 'public-modules/Utilities/helpers';

const { SAVE_SETTINGS, SAVE_EMAIL_PREFERENCES } = actionTypes;
const {
  saveSettingsSuccess,
  saveSettingsFail,
  saveEmailPreferencesSuccess,
  saveEmailPreferencesFail
} = actions;

const {
  setPendingWalletConfirm,
  setPendingReceipt,
  setTransactionError
} = transactionActions;

export function* saveSettings(action) {
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
    linkedin,
    fileName,
    ipfsHash: profileImageIpfsHash
  } = values;

  const data = {
    name,
    email,
    languages,
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
      fileDirectoryHash: profileImageIpfsHash,
      fileName: fileName
    }
  };

  try {
    yield call(request, 'user/settings/', 'POST', { data });
    yield put(saveSettingsSuccess());
  } catch (e) {
    console.log(e);
    yield put(setTransactionError());
    yield put(saveSettingsFail());
  }
}

export function* saveEmailPreferences(action) {
  const { values } = action;
  const {
    activity,
    BountyCommentReceived,
    BountyExpired,
    FulfillmentAcceptedFulfiller,
    FulfillmentSubmittedIssuer,
    FulfillmentUpdatedIssuer,
    RatingIssued,
    TransferRecipient
  } = values;

  const data = {
    emails: {
      activity,
      both: {
        RatingIssued
      },
      issuer: {
        BountyCommentReceived,
        BountyExpired,
        TransferRecipient,
        FulfillmentUpdatedIssuer,
        FulfillmentSubmittedIssuer
      },
      fulfiller: {
        FulfillmentAcceptedFulfiller
      }
    }
  };

  try {
    yield call(request, 'user/settings/', 'POST', { data });
    yield put(saveEmailPreferencesSuccess());
  } catch (e) {
    console.log(e);
    yield put(saveEmailPreferencesFail());
  }
}

export function* watchSaveEmailPreferences() {
  yield takeLatest(SAVE_EMAIL_PREFERENCES, saveEmailPreferences);
}

export function* watchSaveSettings() {
  yield takeLatest(SAVE_SETTINGS, saveSettings);
}

export default [watchSaveSettings, watchSaveEmailPreferences];
