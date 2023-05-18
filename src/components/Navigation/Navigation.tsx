import { NavLink } from 'react-router-dom';

function Navigation(): JSX.Element {
  const classStyle =
    'navigation__item hover:text-base_green_light mr-[20px] ml-[5px] text-[#374151] dark:text-base_white';

  const handleActiveLink = (isActive: boolean) => {
    return isActive ? `${classStyle} text-base_green_light` : classStyle;
  };
  return (
    <div className="navigation font-thin dark:text-base_white">
      <NavLink className={({ isActive }) => handleActiveLink(isActive)} to="/">
        <span className="hover:text-base_green_light">Welcome</span>
      </NavLink>
      <NavLink className={({ isActive }) => handleActiveLink(isActive)} to="/graphi-ql">
        <span className="hover:text-base_green_light">GraphiQL</span>
      </NavLink>
    </div>
  );
}

export default Navigation;
