import { FC } from 'react';
import './loader.scss';

export const Loader: FC = () => {
  return (
    <div
      className='lds-roller'
      data-testid='lds-roller'
    >
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
