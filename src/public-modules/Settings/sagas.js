import request from 'utils/request';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Settings';
import { addressSelector } from 'public-modules/Client/selectors';
import { readFile } from 'public-modules/Utilities/helpers';
import { Buffer } from 'buffer';

const {
  SAVE_SETTINGS,
  SAVE_EMAIL_PREFERENCES,
  UPLOAD_PROFILE_IMAGE
} = actionTypes;

const {
  saveSettingsSuccess,
  saveSettingsFail,
  saveEmailPreferencesSuccess,
  saveEmailPreferencesFail,
  uploadProfileImageSuccess,
  uploadProfileImageFail
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
    smallProfileImageUrl,
    largeProfileImageUrl
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
    small_profile_image_url: smallProfileImageUrl || '',
    large_profile_image_url: largeProfileImageUrl || ''
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
    ContributionReceived,
    BountyCompleted
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

export function* uploadProfileImage(action) {
  const { smallImage, largeImage } = action;

  const sm_reader = yield call(readFile, smallImage);
  const lg_reader = yield call(readFile, largeImage);

  const sm_buffer = Buffer.from(sm_reader.result);
  const lg_buffer = Buffer.from(lg_reader.result);

  try {
    const { sm_put_url, lg_put_url, sm_url, lg_url } = yield call(
      request,
      'user/requestProfileImageUploadURL',
      'GET'
    );

    yield call(request, sm_put_url, 'PUT', {
      headers: {
        'content-type': 'image/png',
        'cache-control': 'max-age=31536000',
        'content-disposition': `inline; filename="${smallImage.name}"`
      },
      data: sm_buffer
    });

    yield call(request, lg_put_url, 'PUT', {
      headers: {
        'content-type': 'image/png',
        'cache-control': 'max-age=31536000',
        'content-disposition': `inline; filename="${largeImage.name}"`
      },
      data: lg_buffer
    });

    yield put(uploadProfileImageSuccess(sm_url, lg_url));
  } catch (e) {
    console.log(e);
    yield put(uploadProfileImageFail());
  }
}

export function* watchUploadProfileImage() {
  yield takeLatest(UPLOAD_PROFILE_IMAGE, uploadProfileImage);
}

export function* watchSaveEmailPreferences() {
  yield takeLatest(SAVE_EMAIL_PREFERENCES, saveEmailPreferences);
}

export function* watchSaveSettings() {
  yield takeLatest(SAVE_SETTINGS, saveSettings);
}

export default [
  watchSaveSettings,
  watchSaveEmailPreferences,
  watchUploadProfileImage
];
