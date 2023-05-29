import { Query } from '../types';

interface IQueriesComponent {
  docs: Array<Query>;
  getField: (el: string) => void;
  getQueryDescription: (el: string) => void;
}

export const QueriesComponent = ({ docs, getField, getQueryDescription }: IQueriesComponent) => {
  return (
    <>
      <div className="title text-2xl pr-8 mb-4 text-base_green">Queries</div>
      {docs.map((item, index) => {
        return (
          <div className="wrapper mb-4 text-base_dark dark:text-base_white" key={index.toString()}>
            <div>
              <button
                type="button"
                className="text-base_green hover:underline"
                onClick={(e) => {
                  getQueryDescription(e.currentTarget.textContent!);
                }}
              >
                {item.name}
              </button>
              <span>(</span>
              {item.args.map(({ name, type }, indexArg) => {
                return (
                  <span className="text-base_yellow" key={indexArg.toString()}>
                    <span className="text-base_red">{name}:</span>{' '}
                    <button
                      type="button"
                      className="text-base_yellow_dark hover:underline"
                      onClick={(e) => {
                        const query = e.currentTarget.textContent!.replace(/[^a-z]/gi, '');
                        getField(query);
                      }}
                    >
                      {type}
                    </button>
                    {indexArg === item.args.length - 1 ? (
                      ''
                    ) : (
                      <span className="text-base_dark dark:text-base_white">, </span>
                    )}
                  </span>
                );
              })}
              <span>): </span>
              <button
                type="button"
                className="text-base_yellow_dark hover:underline"
                onClick={(e) => {
                  const query = e.currentTarget.textContent!.replace(/[^a-z]/gi, '');
                  getField(query);
                }}
              >
                {item.type}
              </button>
            </div>
            <div>{item.description}</div>
          </div>
        );
      })}
    </>
  );
};
