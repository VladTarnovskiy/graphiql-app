import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

import { auth } from 'src/utils/firebase';

interface RoutesProps {
  children: JSX.Element;
}

export const CloseRoute: FC<RoutesProps> = ({ children }) => {
  const [user] = useAuthState(auth);

  return user ? children : <Navigate to='/' />;
};

export const OpenRoute: FC<RoutesProps> = ({ children }) => {
  const [user] = useAuthState(auth);

  return !user ? children : <Navigate to='/graphi-ql' />;
};
