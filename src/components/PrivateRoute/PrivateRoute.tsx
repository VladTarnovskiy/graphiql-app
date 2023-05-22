import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { IPrivateRoute } from 'src/types/interfaces';
import { auth } from 'src/utils/firebase';

export default function PrivateRoute({ children }: IPrivateRoute): JSX.Element {
  const [user] = useAuthState(auth);
  return user ? children : <Navigate to="/" />;
}
