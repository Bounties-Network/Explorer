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

const { SAVE_SETTINGS, SAVE_EMAIL_PREFERENCES } = actionTypes;
const {
  saveSettingsSuccess,
  saveSettingsFail,
  saveEmailPreferencesSuccess,
  saveEmailPreferencesFail
} = actions;

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
    languages: '', //map(l => l.trim(), languages.split(',')),
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

  console.log('dump', values);
  console.log('settings', settings);
  return;

  const ipfsHash = yield call(addJSON, settings);

  console.log('ipfs', ipfsHash);

  const { ethProfiles } = yield call(getContractClient);
  try {
    yield call(ethProfiles.addProfile(ipfsHash).send, { from: userAddress });
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
    BountyComment,
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
        BountyComment,
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
    const r = yield call(request, `user/settings/`, 'POST', { data });
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
