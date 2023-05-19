import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRef, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import Button from '../Button/Button';
import LogoImg from '../../assets/logo.png';
import { auth } from '../../utils/firebase';
import './header.scss';
import Modal from '../Modal/Modal';
import SettingModal from '../SettingModal/SettingModal';
import Settings from '../../assets/settings.svg';

function Header(): JSX.Element {
  const [user] = useAuthState(auth);
  const headerRef = useRef<HTMLDivElement>(null);
  const [settingsFlag, setSettingsFlag] = useState(false);

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 3) {
      headerRef.current?.classList.add('is-sticky');
    } else {
      headerRef.current?.classList.remove('is-sticky');
    }
  });

  return (
    <header
      className="header animate__animated sticky top-0 w-full z-20 backdrop-blur-xl header flex justify-between items-center shadow-lg bg-gray-400/20 pl-[2%] pr-[2%] mb-6 transition ease-in-out delay-100 dark:bg-dark_header/20"
      ref={headerRef}
    >
      <div className="header__logo overflow-hidden">
        <img
          src={LogoImg}
          alt="Rick and Morty"
          className="logo block w-60 h-20 mt-[-10px] lg:hidden"
        />
        <img
          src={LogoImg}
          alt="Rick and Morty"
          className="logo_small hidden w-[110px] h-[45px] lg:block mt-[-12px]"
        />
        <div className="header__title lg:text-[11px] font-thin text-teal-500 shadow-yellow-300/60 shadow-lg mt-[-3px]">
          Playground/IDE
        </div>
      </div>
      <Navigation />
      <div className="headerAllButtons flex flex-row content-center items-center sm:hidden">
        <button
          className="setting rounded-full w-9 h-9 m-2 hover:scale-105 active:scale-100 cursor-pointer transition ease-in-out delay-75"
          type="button"
          onClick={() => {
            setSettingsFlag(true);
          }}
        >
          <img src={Settings} alt="Settings" />
        </button>
        {settingsFlag && (
          <Modal setCloseFlag={setSettingsFlag}>
            <SettingModal />
          </Modal>
        )}
        {user ? (
          <Button title="Logout" />
        ) : (
          <NavLink className="header__buttons flex" to="/authorization">
            <Button title="Sign In" />
            <Button title="Sign Up" />
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
