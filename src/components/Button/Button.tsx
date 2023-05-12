import { useDispatch } from 'react-redux';
import { authorizationPageText } from '../../app/slice/AuthorizationPage.slice';
import { IButtonProps } from '../../types/interfaces';
import { logout } from '../../utils/firebase';

function Button(prop: IButtonProps): JSX.Element {
  const dispatch = useDispatch();

  const { title } = prop;

  const changePage = () => {
    if (title === 'Sign In') {
      dispatch(authorizationPageText('Login'));
    } else if (title === 'Sign Up') {
      dispatch(authorizationPageText('Registration'));
    } else {
      logout();
    }
  };

  return (
    <div
      onClick={changePage}
      onKeyPress={changePage}
      role="button"
      tabIndex={0}
      className="button h-[40px] min-w-[100px] w-fit m-2 pt-1 p-2 bg-teal-400 rounded text-center text-gray-700 hover:shadow-md hover:shadow-yellow-300/60 hover:cursor-pointer active:scale-[95%] transition ease-in-out delay-75"
    >
      {title}
    </div>
  );
}

export default Button;
