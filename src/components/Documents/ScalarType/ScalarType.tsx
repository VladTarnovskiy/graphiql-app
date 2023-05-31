import { FC } from 'react';
import { ScalarType } from '../types';

interface IScalarTypeComponent {
  docs: ScalarType;
}

export const ScalarTypeComponent: FC<IScalarTypeComponent> = ({ docs: { name, description } }) => {
  return (
    <>
      <div className='title text-2xl pr-8 mb-4 text-base_green'>{name}</div>
      <div className='mb-4'>{description}</div>
    </>
  );
};
