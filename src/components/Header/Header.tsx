import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navigation from '../Navigation/Navigation';
import Button from '../Button/Button';
import LogoImg from '../../assets/logo.png';
import { auth, logout } from '../../utils/firebase';

function Header(): JSX.Element {
  const [user] = useAuthState(auth);
  return (
    <div className="header flex justify-between items-center shadow-lg bg-gray-400/20 pl-[2%] pr-[2%] mb-6">
      <div className="header__logo overflow-hidden">
        <img src={LogoImg} alt="Rick and Morty" className="block w-60 h-20 mt-[-10px]" />
        <div className="text-sm font-thin text-teal-500 shadow-yellow-300/60 shadow-lg mt-[-3px]">
          GraphQL IDE
        </div>
      </div>
      <Navigation />
      {user ? (
        <div
          onClick={logout}
          onKeyPress={logout}
          role="button"
          tabIndex={0}
          className="button h-[40px] w-[100px] m-2 pt-1 bg-teal-400 rounded text-center text-gray-700 hover:shadow-md hover:shadow-yellow-300/60 hover:cursor-pointer active:scale-[95%] transition ease-in-out delay-75"
        >
          Logout
        </div>
      ) : (
        <NavLink className="header__buttons flex" to="/authorization">
          <Button text="Sign In" />
          <Button text="Sign Up" />
        </NavLink>
      )}
    </div>
  );
}

export default Header;
