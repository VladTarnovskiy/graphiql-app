import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FC, useEffect, useRef, useState } from 'react';
import LogoImg from 'src/assets/logo.png';
import { auth } from 'src/utils/firebase';
import Settings from 'src/assets/settings.svg';
import { Navigation } from '../Navigation/Navigation';
import { Button } from '../Button/Button';
import './header.scss';
import { Modal } from '../Modal/Modal';
import { SettingModal } from '../SettingModal/SettingModal';

export const Header: FC = () => {
  const [user] = useAuthState(auth);
  const headerRef = useRef<HTMLDivElement>(null);
  const [settingsFlag, setSettingsFlag] = useState(false);
  const [small, setSmall] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      window.onscroll = () => setSmall(window.pageYOffset > 0);
    }, 30);
  }, []);

  return (
    <header
      className={`${
        small ? 'is-sticky sm:h-40' : ''
      } header animate__animated top-0 w-full z-20 backdrop-blur-xl flex justify-between items-center shadow-lg bg-gray-400/20 pl-[2%] pr-[2%] mb-6 transition ease-in-out delay-100 dark:bg-dark_header/20`}
      ref={headerRef}
    >
      <NavLink to='/'>
        <div className='header__logo overflow-hidden'>
          <img
            src={LogoImg}
            alt='Rick and Morty'
            className='logo block w-[150px] h-[60px] mt-[-10px] lg:hidden'
          />
          <img
            src={LogoImg}
            alt='Rick and Morty'
            className='logo_small hidden w-[110px] h-[45px] lg:block mt-[-12px]'
          />
          <div className='header__title text-[13px] font-thin text-teal-500 shadow-yellow-300/60 shadow-lg mt-[-3px]'>
            Playground/IDE
          </div>
        </div>
      </NavLink>

      <Navigation />
      <div className='headerAllButtons flex flex-row content-center items-center sm:hidden'>
        {user ? (
          <Button title='Logout' />
        ) : (
          <NavLink
            className='header__buttons flex'
            to='/authorization'
          >
            <Button title='Sign In' />
            <Button title='Sign Up' />
          </NavLink>
        )}
        <button
          className='setting rounded-full w-7 h-7 m-2 hover:scale-105 active:scale-100 cursor-pointer transition ease-in-out delay-75'
          type='button'
          onClick={() => {
            setSettingsFlag(true);
          }}
        >
          <img
            src={Settings}
            alt='Settings'
          />
        </button>
        {settingsFlag && (
          <Modal setCloseFlag={setSettingsFlag}>
            <SettingModal />
          </Modal>
        )}
      </div>
    </header>
  );
};
