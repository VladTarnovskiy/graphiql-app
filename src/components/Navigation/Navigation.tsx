import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import { auth } from 'src/utils/firebase';

function Navigation(): JSX.Element {
  const [user] = useAuthState(auth);

  const classStyle =
    'navigation__item hover:text-base_green_light mr-[20px] ml-[5px] text-[#374151] dark:text-base_white';

  const handleActiveLink = (isActive: boolean) => {
    return isActive
      ? `${classStyle.replace(
          'dark:text-base_white',
          'dark:text-base_green_light'
        )} text-base_green_light`
      : classStyle;
  };
  return (
    <div className="navigation font-thin dark:text-base_white">
      <NavLink className={({ isActive }) => handleActiveLink(isActive)} to="/">
        <span className="hover:text-base_green_light">Welcome</span>
      </NavLink>
      {user && (
        <NavLink className={({ isActive }) => handleActiveLink(isActive)} to="/graphi-ql">
          <span className="hover:text-base_green_light">GraphiQL</span>
        </NavLink>
      )}
    </div>
  );
}

export default Navigation;
