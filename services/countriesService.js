import countriesService from 'countries-list';
import countriesTranslations from 'i18n-iso-countries';

countriesTranslations.registerLocale(require("i18n-iso-countries/langs/en.json"));
countriesTranslations.registerLocale(require("i18n-iso-countries/langs/ar.json"));

export const getTranslatedName = (key, locale) => {
  const idxOfDash = locale.indexOf('-');
  const languageCode = idxOfDash === -1 ? locale : locale.substring(0, idxOfDash);
  return countriesTranslations.getName(key, languageCode);
}

export const countries = countriesService.countries;