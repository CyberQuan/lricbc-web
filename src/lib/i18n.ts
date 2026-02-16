import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enCommon from '../locales/en/common.json';
import zhCommon from '../locales/zh-CN/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      'zh-CN': { common: zhCommon },
    },
    lng: 'zh-CN',
    fallbackLng: 'zh-CN',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'cookie', 'path', 'navigator'],
      caches: ['localStorage', 'cookie'],
      lookupLocalStorage: 'i118nextLng',
    },
  });

export default i18n;
