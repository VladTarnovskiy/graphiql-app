import { Query } from '../types';

interface MyProps {
  docs: Query;
  getField: (el: string) => void;
}

function QueryDescription(props: MyProps): JSX.Element {
  const { docs, getField } = props;
  return (
    <>
      <div className="title text-2xl pr-8 mb-4 text-base_green">{docs.name}</div>
      <div className="mb-4">{docs.description}</div>
      <div className="wrapper mb-4 text-base_dark dark:text-base_white">
        <div className="flex flex-col items-start">
          <div className="type__title">- Type:</div>
          <button
            type="button"
            className="text-base_green hover:underline mb-4"
            onClick={(e) => {
              const query = e.currentTarget.textContent!.replace(/[^a-z]/gi, '');
              getField(query);
            }}
          >
            {docs.type}
          </button>
          <div>- Args:</div>
          {docs.args.map((itemArg, indexArg) => {
            return (
              <span className="text-base_yellow" key={indexArg.toString()}>
                <span className="text-base_red">{itemArg.name}:</span>{' '}
                <button
                  type="button"
                  className="text-base_yellow_dark hover:underline"
                  onClick={(e) => {
                    const query = e.currentTarget.textContent!.replace(/[^a-z]/gi, '');
                    getField(query);
                  }}
                >
                  {itemArg.type}
                </button>
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default QueryDescription;