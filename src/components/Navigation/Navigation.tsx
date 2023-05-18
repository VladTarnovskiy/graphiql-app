import { NavLink } from 'react-router-dom';

function Navigation(): JSX.Element {
  return (
    <div className="navigation font-thin dark:text-base_white">
      <NavLink
        className="navigation__item hover:text-base_green_light mr-[20px] ml-[5px] text-[#374151] dark:text-base_white"
        to="/"
      >
        <span className="hover:text-base_green_light">Welcome</span>
      </NavLink>
      <NavLink
        className="navigation__item hover:text-base_green_light mr-[20px] ml-[5px] text-[#374151] dark:text-base_white"
        to="/graphi-ql"
      >
        <span className="hover:text-base_green_light">GraphiQL</span>
      </NavLink>
    </div>
  );
}

export default Navigation;
