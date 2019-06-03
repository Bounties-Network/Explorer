import intl from 'react-intl-universal';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { INIT_TRANSLATIONS, UPDATE_LOCALE } from './constants';
import { actions } from './index';

// app locale data
const locales = {
  'en-US': require('../../i18n/en_US'),
  'hr-HR': require('../../i18n/hr_HR')
};

export function* initTranslations(action) {
  const locale = action.locale
    ? action.locale
    : intl.determineLocale({
        urlLocaleKey: 'lang',
        cookieLocaleKey: 'lang'
      });
  yield intl.init({
    currentLocale: locale,
    locales
  });
  yield put(actions.translationLoaded(locale));
}
export function* changeLocale(action) {
  yield intl.init({
    ...intl.getInitOptions(),
    currentLocale: action.locale
  });
  yield put(actions.translationLoaded(action.locale));
}

export function* watchInitTranslations() {
  yield takeLatest(INIT_TRANSLATIONS, initTranslations);
}

export function* watchLocaleUpdate() {
  yield takeEvery(UPDATE_LOCALE, changeLocale);
}

export default [watchInitTranslations, watchLocaleUpdate];
