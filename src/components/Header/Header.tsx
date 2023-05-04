import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Button from '../Button/Button';

function Header(): JSX.Element {
  return (
    <div className="header flex justify-between items-center shadow-lg bg-gray-400/20 pl-[2%] pr-[2%] mb-6">
      <div className="header__logo overflow-hidden">
        <img
          src="src/assets/logo.png"
          alt="Rick and Morty"
          className="block w-60 h-20 mt-[-10px]"
        />
        <div className="text-sm font-thin text-teal-500 shadow-yellow-300/60 shadow-lg mt-[-3px]">
          GraphQL IDE
        </div>
      </div>
      <Navigation />
      <NavLink className="header__buttons flex" to="/authorization">
        <Button text="Sign In" />
        <Button text="Sign Up" />
      </NavLink>
    </div>
  );
}

export default Header;
