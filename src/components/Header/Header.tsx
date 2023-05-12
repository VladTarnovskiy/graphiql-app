import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import X from 'src/assets/rick-and-morty.png';
import Navigation from '../Navigation/Navigation';
import Button from '../Button/Button';
import LogoImg from '../../assets/logo.png';
import { auth } from '../../utils/firebase';

// function scrollAnimation(e: React.UIEvent<HTMLDivElement>) {
//   console.log(window.pageYOffset)

//   const el = e.target as Element;
//   if (window.pageYOffset > 10) {
//     el.classList.add('h-[400px]');
//   } else {
//     el.classList.remove('h-[400px]');
//   }
// }

function Header(): JSX.Element {
  const [user] = useAuthState(auth);

  return (
    <div
      className="sticky top-0 z-20 backdrop-blur-xl header flex justify-between items-center shadow-lg bg-gray-400/20 pl-[2%] pr-[2%] mb-6 transition ease-in-out delay-75"
      // onWheel={(e) => {
      //   scrollAnimation(e);
      //   console.log(window.pageYOffset);

      // }}
    >
      <div className="header__logo overflow-hidden">
        <img src={LogoImg} alt="Rick and Morty" className="block w-60 h-20 mt-[-10px] sm:hidden" />
        <img src={X} alt="Rick and Morty" className="hidden w-30 h-20 sm:block" />
        <div className="text-sm xs:hidden font-thin text-teal-500 shadow-yellow-300/60 shadow-lg mt-[-3px]">
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
    </div>
  );
}

export default Header;
