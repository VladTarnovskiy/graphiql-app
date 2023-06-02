import { FC } from 'react';
import { ScalarType } from '../types';

interface IScalarTypeComponent {
  docs: ScalarType;
}

export const ScalarTypeComponent: FC<IScalarTypeComponent> = ({ docs: { name, description } }) => {
  return (
    <>
      <div className='title mb-4 pr-8 text-2xl text-base_green'>{name}</div>
      <div className='mb-4'>{description}</div>
    </>
  );
};
