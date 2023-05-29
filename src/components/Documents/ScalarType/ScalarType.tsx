import { ScalarType } from '../types';

interface IScalarTypeComponent {
  docs: ScalarType;
}

export const ScalarTypeComponent = (props: IScalarTypeComponent) => {
  const { docs } = props;
  return (
    <>
      <div className="title text-2xl pr-8 mb-4 text-base_green">{docs.name}</div>
      <div className="mb-4">{docs.description}</div>
    </>
  );
};
