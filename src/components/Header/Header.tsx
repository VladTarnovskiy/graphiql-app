import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navigation from '../Navigation/Navigation';
import Button from '../Button/Button';
import LogoImg from '../../assets/logo.png';
import { auth } from '../../utils/firebase';

function Header(): JSX.Element {
  const [user] = useAuthState(auth);

  return (
    <div className="header flex justify-between items-center shadow-lg bg-gray-400/20 pl-[2%] pr-[2%] mb-6">
      <div className="header__logo overflow-hidden">
        <img src={LogoImg} alt="Rick and Morty" className="block w-60 h-20 mt-[-10px]" />
        <div className="text-sm font-thin text-teal-500 shadow-yellow-300/60 shadow-lg mt-[-3px]">
          Playground
        </div>
      </div>
      <Navigation />
      {user ? (
        <Button text="Logout" />
      ) : (
        <NavLink className="header__buttons flex" to="/authorization">
          <Button title="Sign In" />
          <Button title="Sign Up" />
        </NavLink>
      )}
    </div>
  );
}

export default Header;
