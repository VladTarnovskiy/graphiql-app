import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import FormComponent from '../../components/FormComponent/FormComponent';

function AuthorizationPage(): JSX.Element {
  const authorizationText = useSelector((state: RootState) => state.authorization.page);

  return (
    <div
      className="text-teal-500 m-auto text-2xl max-w-[600px]"
      data-testid="authorization-element"
    >
      {authorizationText === 'Registration' ? (
        <FormComponent headerTitle="Registration" buttonTitle="Registration" />
      ) : (
        <FormComponent headerTitle="Login" buttonTitle="Login" />
      )}
    </div>
  );
}

export default AuthorizationPage;
