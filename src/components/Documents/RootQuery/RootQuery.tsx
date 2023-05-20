interface MyProps {
  getQueries: () => void;
}

function RootQueryComponent(props: MyProps): JSX.Element {
  const { getQueries } = props;
  return (
    <div className="root__wrapper">
      <div className="docs__title text-2xl pr-8 mb-4 text-base_green">Documents</div>
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
            getQueries();
          }}
        >
          Query
        </button>
      </div>
    </div>
  );
}

export default RootQueryComponent;
