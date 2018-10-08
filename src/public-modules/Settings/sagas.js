import request from 'utils/request';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Settings';
import { addressSelector } from 'public-modules/Client/selectors';

const { SAVE_SETTINGS, SAVE_EMAIL_PREFERENCES } = actionTypes;
const {
  saveSettingsSuccess,
  saveSettingsFail,
  saveEmailPreferencesSuccess,
  saveEmailPreferencesFail
} = actions;

export function* saveSettings(action) {
  const { values } = action;
  const address = yield select(addressSelector);
  const {
    name,
    email,
    wants_marketing_emails,
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
    wants_marketing_emails,
    languages,
    organization,
    skills,
    website,
    github: github.substr(1), // remove @ symbol from handle
    twitter: twitter.substr(1), // remove @ symbol from handle
    linkedin,
    //dribbble,
    profileDirectoryHash: profileImageIpfsHash,
    profileFileName: fileName
  };

  try {
    yield call(request, `user/${address}/profile/`, 'POST', { data });
    yield put(saveSettingsSuccess());
  } catch (e) {
    console.log(e);
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
    RatingReceived,
    TransferRecipient,
    ContributionReceived
  } = values;

  const data = {
    emails: {
      activity,
      both: {
        RatingReceived
      },
      issuer: {
        BountyCommentReceived,
        BountyExpired,
        TransferRecipient,
        FulfillmentUpdatedIssuer,
        FulfillmentSubmittedIssuer,
        ContributionReceived,
        BountyCompleted
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
