import { t } from 'i18next';
import { useDispatch } from 'react-redux';
import { authorizationPageText } from 'src/app/slice/AuthorizationPage.slice';
import { logout } from 'src/utils/firebase';

interface IButtonProps {
  title: string;
  button?: boolean;
}

enum ButtonsEnum {
  SignIn = 'Sign In',
  SignUp = 'Sign Up',
  Logout = 'Logout',
}

export const Button = ({ title, button }: IButtonProps) => {
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
      role="button"
      onKeyPress={changePage}
      tabIndex={0}
      className="button hover:text-base_green_light hover:scale-105 active:scale-100 cursor-pointer transition ease-in-out delay-75 text-[#374151] dark:text-base_white"
    >
      {t(`header.${title}`)}
    </div>
  ) : (
    <div
      onClick={changePage}
      onKeyPress={changePage}
      role="button"
      tabIndex={0}
      className="button h-[40px] min-w-[100px] w-fit m-2 pt-1 p-2 bg-teal-400 rounded text-center text-gray-700 hover:shadow-md hover:shadow-yellow-300/60 hover:cursor-pointer active:scale-[95%] transition ease-in-out delay-75"
    >
      {t(`header.${title}`)}
    </div>
  );
};
