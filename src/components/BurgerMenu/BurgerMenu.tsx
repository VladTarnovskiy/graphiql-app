import { t } from 'i18next';
import { FC, useState } from 'react';
import { stack as Menu } from 'react-burger-menu';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import { auth } from 'src/utils/firebase';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { SettingModal } from '../SettingModal/SettingModal';
import './Burger.scss';

interface IState {
  isOpen: boolean;
}

export const BurgerMenu: FC = () => {
  const [settingsFlag, setSettingsFlag] = useState(false);
  const [user] = useAuthState(auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleStateChange = (state: IState) => {
    setIsMenuOpen(state.isOpen);
  };

  const openSettings = () => {
    setIsMenuOpen(false);
    setSettingsFlag(true);
  };

  return (
    <Menu
      right
      width='100%'
      pageWrapId='page-wrap'
      outerContainerId='outer-container'
      isOpen={isMenuOpen}
      onStateChange={handleStateChange}
    >
      <NavLink
        className='navigation__item hover:text-base_green_light hover:scale-105 active:scale-100 cursor-pointer transition ease-in-out delay-75 text-[#374151] dark:text-base_white'
        to='/'
        onClick={handleCloseMenu}
      >
        <span className='hover:text-base_green_light'>{t(`header.Welcome`)}</span>
      </NavLink>
      {user && (
        <NavLink
          className='navigation__item hover:text-base_green_light hover:scale-105 active:scale-100 cursor-pointer transition ease-in-out delay-75 text-[#374151] dark:text-base_white'
          to='/graphi-ql'
          onClick={handleCloseMenu}
        >
          <span className='hover:text-base_green_light'>{t(`header.Main`)}</span>
        </NavLink>
      )}
      <button
        className='setting hover:text-base_green_light hover:scale-105 active:scale-100 cursor-pointer transition ease-in-out delay-75 text-[#374151] dark:text-base_white'
        type='button'
        onClick={openSettings}
      >
        {t(`Setting.Title`)}
      </button>
      {settingsFlag && (
        <Modal setCloseFlag={setSettingsFlag}>
          <SettingModal />
        </Modal>
      )}
      {user ? (
        <Button
          title='Logout'
          button={false}
        />
      ) : (
        <NavLink
          className='header__buttons flex'
          to='/authorization'
          onClick={handleCloseMenu}
        >
          <Button
            title='Sign In'
            button={false}
          />
          <Button
            title='Sign Up'
            button={false}
          />
        </NavLink>
      )}
    </Menu>
  );
};
