import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import { auth } from 'src/utils/firebase';
import clsx from 'clsx';
import { FC } from 'react';

export const Navigation: FC = () => {
  const [user] = useAuthState(auth);
  const { t } = useTranslation();

  const handleActiveLink = (isActive: boolean) => {
    return clsx(
      'navigation__item hover:text-base_green_light mr-[20px] ml-[5px] text-[#374151]',
      isActive ? 'dark:text-base_green_light text-base_green_light' : 'dark:text-base_white'
    );
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
