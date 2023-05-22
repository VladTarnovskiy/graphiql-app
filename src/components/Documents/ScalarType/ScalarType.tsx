import { ScalarType } from '../types';

interface MyProps {
  docs: ScalarType;
}

function ScalarTypeComponent(props: MyProps): JSX.Element {
  const { docs } = props;
  return (
    <>
      <div className="title text-2xl pr-8 mb-4 text-base_green">{docs.name}</div>
      <div className="mb-4">{docs.description}</div>
    </>
  );
}

export default ScalarTypeComponent;
