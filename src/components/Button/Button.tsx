import { t } from 'i18next';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { authorizationPageText } from 'src/app/slice/AuthorizationPage.slice';
import { logout } from 'src/utils/firebase';

interface ButtonProps {
  title: string;
  button?: boolean;
}

enum ButtonsEnum {
  SignIn = 'Sign In',
  SignUp = 'Sign Up',
  Logout = 'Logout',
}

export const Button: FC<ButtonProps> = ({ title, button }) => {
  const dispatch = useDispatch();

  const changePage = () => {
    if (title === ButtonsEnum.SignIn) {
      dispatch(authorizationPageText('Login'));
    }

    if (title === ButtonsEnum.SignUp) {
      dispatch(authorizationPageText('Registration'));
    }

    if (title === ButtonsEnum.Logout) {
      logout();
    }
  };

  return button === false ? (
    <div
      onClick={changePage}
      role='button'
      onKeyPress={changePage}
      tabIndex={0}
      className='button cursor-pointer text-[#374151] transition delay-75 ease-in-out hover:scale-105 hover:text-base_green_light active:scale-100 dark:text-base_white'
    >
      {t(`header.${title}`)}
    </div>
  ) : (
    <div
      onClick={changePage}
      onKeyPress={changePage}
      role='button'
      tabIndex={0}
      className='button m-2 h-[40px] w-fit min-w-[100px] rounded bg-teal-400 p-2 pt-1 text-center text-gray-700 transition delay-75 ease-in-out hover:cursor-pointer hover:shadow-md hover:shadow-yellow-300/60 active:scale-[95%]'
    >
      {t(`header.${title}`)}
    </div>
  );
};
