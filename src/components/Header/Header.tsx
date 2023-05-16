import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import X from 'src/assets/rick-and-morty.png';
import { useRef } from 'react';
import Navigation from '../Navigation/Navigation';
import Button from '../Button/Button';
import LogoImg from '../../assets/logo.png';
import { auth } from '../../utils/firebase';
import './header.scss';

function Header(): JSX.Element {
  const [user] = useAuthState(auth);
  const headerRef = useRef<HTMLDivElement>(null);

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 90) {
      headerRef.current?.classList.add('is-sticky');
    } else {
      headerRef.current?.classList.remove('is-sticky');
    }
  });

  return (
    <header
      className="header sticky top-0 w-full z-20 backdrop-blur-xl header flex justify-between items-center shadow-lg bg-gray-400/20 dark:bg-dark_header pl-[2%] pr-[2%] mb-6 transition ease-in-out delay-75"
      ref={headerRef}
    >
      <div className="header__logo overflow-hidden">
        <img
          src={LogoImg}
          alt="Rick and Morty"
          className="logo block w-60 h-20 mt-[-10px] sm:hidden"
        />
        <img src={X} alt="Rick and Morty" className="hidden w-16 h-16 sm:block" />
        <div className="header__title text-sm xs:hidden font-thin text-teal-500 shadow-yellow-300/60 shadow-lg mt-[-3px]">
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
