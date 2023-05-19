import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

function Navigation(): JSX.Element {
  const { t } = useTranslation();
  return (
    <div className="navigation font-thin dark:text-base_white sm:hidden">
      <NavLink
        className="navigation__item hover:text-base_green_light mr-[20px] ml-[5px] text-[#374151] dark:text-base_white"
        to="/"
      >
        <span className="hover:text-base_green_light">{t(`header.Welcome`)}</span>
      </NavLink>
      <NavLink
        className="navigation__item hover:text-base_green_light mr-[20px] ml-[5px] text-[#374151] dark:text-base_white"
        to="/graphi-ql"
      >
        <span className="hover:text-base_green_light">{t(`header.Main`)}</span>
      </NavLink>
    </div>
  );
}

export default Navigation;
