import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import FormComponent from '../../components/FormComponent/FormComponent';
import { auth } from '../../utils/firebase';

function AuthorizationPage(): JSX.Element {
  const authorizationText = useSelector((state: RootState) => state.authorization.page);

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/graphi-ql');
    }
  });

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
