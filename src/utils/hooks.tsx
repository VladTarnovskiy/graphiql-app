import { useEffect } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { selectLanguage, selectTheme } from 'src/app/slice/SettingsSlice';
import i18n from 'src/i18n/i18n';

enum LanguageEnum {
  En = 'en',
  Ru = 'ru',
}
enum ThemeEnum {
  Dark = 'dark',
}

export const useThemeAndLanguage = () => {
  const languageFromStore = useAppSelector(selectLanguage);
  const themeFromStore = useAppSelector(selectTheme);

  useEffect(() => {
    if (languageFromStore === LanguageEnum.En) {
      i18n.changeLanguage('en');
    }
    if (languageFromStore === LanguageEnum.Ru) {
      i18n.changeLanguage('ru');
    }
    if (themeFromStore === ThemeEnum.Dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  });
};
