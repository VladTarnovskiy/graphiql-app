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
      } header animate__animated top-0 z-20 mb-6 flex w-full items-center justify-between bg-gray-400/20 pl-[2%] pr-[2%] shadow-md backdrop-blur-xl transition delay-100 ease-in-out dark:bg-dark_header/20`}
      ref={headerRef}
    >
      <NavLink to='/'>
        <div className='header__logo overflow-hidden'>
          <img
            src={LogoImg}
            alt='Rick and Morty'
            className='logo mt-[-10px] block h-[60px] w-[150px] lg:hidden'
          />
          <img
            src={LogoImg}
            alt='Rick and Morty'
            className='logo_small mt-[-12px] hidden h-[45px] w-[110px] lg:block'
          />
          <div className='header__title mt-[-3px] text-[13px] font-thin text-teal-500 shadow-md shadow-yellow-300/60'>
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
          className='setting m-2 h-7 w-7 cursor-pointer rounded-full transition delay-75 ease-in-out hover:scale-105 active:scale-100'
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
