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
    <div className="text-teal-500 text-center text-2xl">
      {authorizationText === 'Registration' ? (
        <FormComponent headerTitle="Registration" buttonTitle="Registration" />
      ) : (
        <FormComponent headerTitle="Login" buttonTitle="Login" />
      )}
    </div>
  );
}

export default AuthorizationPage;
