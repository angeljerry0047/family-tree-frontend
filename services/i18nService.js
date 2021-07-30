import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
import en from '../i18n/en';
import ar from '../i18n/ar';

i18n.fallbacks = true;
i18n.translations = { en, ar };
i18n.locale = getLocale();
i18n.isRtl = i18n.locale === 'ar';

const languageCode = i18n.locale === 'ar' ? 'ar-SY' : 'en-US';

function parseArabicNumber(str) {
  return Number(str.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function(d) {
    return d.charCodeAt(0) - 1632; // Convert Arabic numbers
  }));
}

function translateNumber(str, formattingOptions) {
  return Number(str).toLocaleString(languageCode, formattingOptions);
}

function translatePhoneNumber(phoneNumber) {
  const indxOfPlus = phoneNumber.indexOf('+');
  const rawNumber = indxOfPlus == -1 ? phoneNumber : phoneNumber.substring(1);
  return `+${translateNumber(rawNumber, {useGrouping: false})}`;
}

function translateDate(date) {
  return new Date(date).toLocaleDateString(languageCode);
}

function withRtlTextStyle(styles) {
  return [...styles, i18n.isRtl ? { textAlign: 'right' } : {}];
}

function getLocale() {
  const locale = Localization.locale;
  const idxOfDash = locale.indexOf('-');
  return idxOfDash === -1 ? locale : locale.substring(0, idxOfDash);
}

i18n.withRtlTextStyle = withRtlTextStyle;
i18n.parseArabicNumber = parseArabicNumber;
i18n.translateNumber = translateNumber;
i18n.translatePhoneNumber = translatePhoneNumber;
i18n.translateDate = translateDate;

export default i18n;