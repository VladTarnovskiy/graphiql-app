import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useRef, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import Button from '../Button/Button';
import LogoImg from '../../assets/logo.png';
import { auth } from '../../utils/firebase';
import './header.scss';
import Modal from '../Modal/Modal';
import SettingModal from '../SettingModal/SettingModal';

function Header(): JSX.Element {
  const [user] = useAuthState(auth);
  const headerRef = useRef<HTMLDivElement>(null);
  const [small, setSmall] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      window.onscroll = () => setSmall(window.pageYOffset > 0);
    }, 30);
  }, []);

  return (
    // {settingsFlag && (
    //   <Modal setCloseFlag={setSettingsFlag}>
    //     <SettingModal />
    //   </Modal>
    // )}
    <header
      className={`${
        small ? 'is-sticky' : ''
      } header animate__animated sticky top-0 w-full z-20 backdrop-blur-xl flex justify-between items-center shadow-lg bg-gray-400/20 pl-[2%] pr-[2%] mb-6 transition ease-in-out delay-100 dark:bg-dark_header/20`}
      ref={headerRef}
    >
      <div className="header__logo overflow-hidden">
        <img
          src={LogoImg}
          alt="Rick and Morty"
          className="logo block w-60 h-20 mt-[-15px] sm:hidden"
        />
        <img
          src={LogoImg}
          alt="Rick and Morty"
          className="logo_small hidden w-[110px] h-[45px] sm:block mt-[-12px]"
        />
        <div className="header__title text-sm sm:text-[11px] font-thin text-teal-500 shadow-yellow-300/60 shadow-lg mt-[-3px]">
          Playground/IDE
        </div>
      </div>
      <Navigation />
      {user ? (
        <Button title="Logout" />
      ) : (
        <NavLink className="header__buttons flex" to="/authorization">
          <Button title="Sign In" />
          <Button title="Sign Up" />
        </NavLink>
      )}
    </header>
  );
}

export default Header;
