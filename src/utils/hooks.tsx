import { useEffect } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { selectLanguage, selectTheme } from 'src/app/slice/SettingsSlice';
import i18n from 'src/i18n/i18n';

export default function useThemeAndLanguage() {
  const languageFromStore = useAppSelector(selectLanguage);
  const themeFromStore = useAppSelector(selectTheme);
  useEffect(() => {
    if (languageFromStore === 'en') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('ru');
    }
    if (themeFromStore === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  });
}
