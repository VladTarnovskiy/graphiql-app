import { FC, useEffect, useRef, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { setLanguage, setTheme, selectLanguage, selectTheme } from 'src/app/slice/SettingsSlice';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { changeLanguage } from 'i18next';

function turnRightButton(button: Element) {
  button.classList.remove('translate-x-[100%]');
}

function turnLeftButton(button: Element) {
  button.classList.add('translate-x-[100%]');
}

export const SettingModal: FC = () => {
  const { t } = useTranslation();
  const languageFromStore = useAppSelector(selectLanguage);
  const themeFromStore = useAppSelector(selectTheme);
  const langRef = useRef<HTMLButtonElement>(null);
  const themeRef = useRef<HTMLButtonElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const langButton = langRef.current;
    const themeButton = themeRef.current;
    if (langButton) {
      languageFromStore === 'en' ? turnRightButton(langButton) : turnLeftButton(langButton);
    }
    if (themeButton) {
      themeFromStore === 'light' ? turnRightButton(themeButton) : turnLeftButton(themeButton);
    }
  });

  const switchTranslationEl = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as Element;

    if (button.classList.contains('translate-x-[100%]')) {
      turnRightButton(button);
      dispatch(setLanguage('en'));
      changeLanguage('en');
    } else {
      turnLeftButton(button);
      dispatch(setLanguage('ru'));
      changeLanguage('ru');
    }
  };

  const switchThemeEl = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as Element;
    if (button.classList.contains('translate-x-[100%]')) {
      turnRightButton(button);
      dispatch(setTheme('light'));
      document.body.classList.remove('dark');
    } else {
      turnLeftButton(button);
      dispatch(setTheme('dark'));
      document.body.classList.add('dark');
    }
  };

  return (
    <div className='setting-modal shadow-base_green/50 shadow-xl pb-8 xs:p-2 xs:pb-6  w-full rounded-md bg-base_white  dark:bg-dark_textarea dark:text-base_white'>
      <h1 className='title text-2xl text-center font-normal text-base_green'>
        {t('Setting.Title')}
      </h1>
      <div className='setting__options flex flex-col'>
        <div className='setting__item language'>
          <div className='mx-8 sm:mx-2 shadow rounded-full h-10 mt-4 flex p-1 relative items-center dark:bg-base_dark w-fit'>
            <div className='w-[155px] sm:w-[120px] flex justify-center'>
              <button type='button'>RU</button>
            </div>
            <div className='w-[155px] sm:w-[120px] flex justify-center'>
              <button type='button'>EN</button>
            </div>
            <button
              className='elSwitchLang bg-base_green_light shadow text-white flex items-center justify-center w-[155px] sm:w-[120px] rounded-full h-8 transition-all top-[4px] absolute left-1'
              type='button'
              ref={langRef}
              onClick={(e) => {
                switchTranslationEl(e);
              }}
            >
              {t('Setting.Language')}
            </button>
          </div>
        </div>
        <div className='setting__item theme'>
          <div className='mx-8 sm:mx-2 shadow rounded-full h-10 mt-4 flex p-1 relative items-center w-fit dark:bg-base_dark'>
            <div className='w-[155px] sm:w-[120px] flex justify-center'>
              <button type='button'>{t('Setting.Dark')}</button>
            </div>
            <div className='w-[155px] sm:w-[120px] flex justify-center'>
              <button type='button'>{t('Setting.Light')}</button>
            </div>
            <button
              className='elSwitchTheme bg-base_green_light shadow text-white flex items-center justify-center w-[155px] sm:w-[120px]  rounded-full h-8 transition-all top-[4px] absolute left-1'
              type='button'
              ref={themeRef}
              onClick={(e) => {
                switchThemeEl(e);
              }}
            >
              {t('Setting.Theme')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
