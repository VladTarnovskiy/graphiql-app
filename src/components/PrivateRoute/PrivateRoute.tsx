import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

import { auth } from 'src/utils/firebase';

interface IPrivateRoute {
  children: JSX.Element;
}

export function CloseRoute({ children }: IPrivateRoute): JSX.Element {
  const [user] = useAuthState(auth);
  return user ? children : <Navigate to="/" />;
}

export function OpenRoute({ children }: IPrivateRoute): JSX.Element {
  const [user] = useAuthState(auth);
  return !user ? children : <Navigate to="/graphi-ql" />;
}
