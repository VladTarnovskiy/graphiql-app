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
    <div className='setting-modal w-full rounded-md bg-base_white pb-8 shadow-xl  shadow-base_green/50 dark:bg-dark_textarea dark:text-base_white  xs:p-2 xs:pb-6'>
      <h1 className='title text-center text-2xl font-normal text-base_green'>
        {t('Setting.Title')}
      </h1>
      <div className='setting__options flex flex-col'>
        <div className='setting__item language'>
          <div className='relative mx-8 mt-4 flex h-10 w-fit items-center rounded-full p-1 shadow dark:bg-base_dark sm:mx-2'>
            <div className='flex w-[155px] justify-center sm:w-[120px]'>
              <button type='button'>RU</button>
            </div>
            <div className='flex w-[155px] justify-center sm:w-[120px]'>
              <button type='button'>EN</button>
            </div>
            <button
              className='elSwitchLang absolute left-1 top-[4px] flex h-8 w-[155px] items-center justify-center rounded-full bg-base_green_light text-white shadow transition-all sm:w-[120px]'
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
          <div className='relative mx-8 mt-4 flex h-10 w-fit items-center rounded-full p-1 shadow dark:bg-base_dark sm:mx-2'>
            <div className='flex w-[155px] justify-center sm:w-[120px]'>
              <button type='button'>{t('Setting.Dark')}</button>
            </div>
            <div className='flex w-[155px] justify-center sm:w-[120px]'>
              <button type='button'>{t('Setting.Light')}</button>
            </div>
            <button
              className='elSwitchTheme absolute left-1 top-[4px] flex h-8 w-[155px] items-center justify-center  rounded-full bg-base_green_light text-white shadow transition-all sm:w-[120px]'
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
