import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from 'src/utils/firebase';

interface IPrivateRoute {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: IPrivateRoute): JSX.Element {
  const [user] = useAuthState(auth);
  return user ? children : <Navigate to="/" />;
}
