interface MyProps {
  getFields: () => void;
}

function RootQueryComponent(props: MyProps): JSX.Element {
  const { getFields } = props;
  return (
    <div className="root__wrapper">
      <div className="root__description mb-2">
        A GraphQL schema provides a root type for each kind of operation.
      </div>
      <div className="root__title mb-2">- Root Types</div>
      <div className="root__link">
        <span className="text-base_green">query: </span>
        <button
          className="types__link text-base_yellow_dark hover:underline"
          type="button"
          onClick={() => {
            getFields();
          }}
        >
          Query
        </button>
      </div>
    </div>
  );
}

export default RootQueryComponent;
