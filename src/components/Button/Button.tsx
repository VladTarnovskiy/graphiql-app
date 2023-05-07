import { useDispatch } from 'react-redux';
import { authorizationPageText } from '../../app/slice/AuthorizationPage.slice';

interface MyProps {
  text: string;
}

function Button(prop: MyProps): JSX.Element {
  const dispatch = useDispatch();

  const { text } = prop;

  const changePage = () => {
    if (text === 'Sign In') {
      dispatch(authorizationPageText('Login'));
    } else {
      dispatch(authorizationPageText('Registration'));
    }
  };

  return (
    <div
      onClick={() => changePage()}
      onKeyPress={changePage}
      role="button"
      tabIndex={0}
      className="button h-[40px] w-[100px] m-2 pt-1 bg-teal-400 rounded text-center text-gray-700 hover:shadow-md hover:shadow-yellow-300/60 hover:cursor-pointer active:scale-[95%] transition ease-in-out delay-75"
    >
      {text}
    </div>
  );
}

export default Button;
