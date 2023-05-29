import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import { auth } from 'src/utils/firebase';

export const Navigation = () => {
  const [user] = useAuthState(auth);
  const { t } = useTranslation();

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
    <div className="navigation font-thin dark:text-base_white sm:hidden">
      <NavLink className={({ isActive }) => handleActiveLink(isActive)} to="/">
        <span className="hover:text-base_green_light">{t(`header.Welcome`)}</span>
      </NavLink>
      {user && (
        <NavLink className={({ isActive }) => handleActiveLink(isActive)} to="/graphi-ql">
          <span className="hover:text-base_green_light">{t(`header.Main`)}</span>
        </NavLink>
      )}
    </div>
  );
};
