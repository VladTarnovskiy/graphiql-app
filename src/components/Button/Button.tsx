import { t } from 'i18next';
import { useDispatch } from 'react-redux';
import { authorizationPageText } from '../../app/slice/AuthorizationPage.slice';
import { logout } from '../../utils/firebase';

interface IButtonProps {
  title: string;
  button?: boolean;
}

const Button = (prop: IButtonProps) => {
  const dispatch = useDispatch();

  const { title, button } = prop;

  const changePage = () => {
    if (title === 'Sign In') {
      dispatch(authorizationPageText('Login'));
    } else if (title === 'Sign Up') {
      dispatch(authorizationPageText('Registration'));
    } else {
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

export default Button;
