import { FC } from 'react';
import { Query } from '../types';

interface IQueriesComponent {
  docs: Array<Query>;
  getField: (el: string) => void;
  getQueryDescription: (el: string) => void;
}

export const QueriesComponent: FC<IQueriesComponent> = ({
  docs,
  getField,
  getQueryDescription,
}) => {
  return (
    <>
      <div className="title text-2xl pr-8 mb-4 text-base_green">Queries</div>
      {docs.map(({ name, args, type, description }) => {
        return (
          <div className="wrapper mb-4 text-base_dark dark:text-base_white" key={name}>
            <div>
              <button
                type="button"
                className="text-base_green hover:underline"
                onClick={(e) => {
                  getQueryDescription(e.currentTarget.textContent!);
                }}
              >
                {name}
              </button>
              <span>(</span>
              {args.map(({ name: argName, type: argType }, indexArg) => {
                return (
                  <span className="text-base_yellow" key={argName}>
                    <span className="text-base_red">{argName}:</span>{' '}
                    <button
                      type="button"
                      className="text-base_yellow_dark hover:underline"
                      onClick={(e) => {
                        const query = e.currentTarget.textContent!.replace(/[^a-z]/gi, '');
                        getField(query);
                      }}
                    >
                      {argType}
                    </button>
                    {indexArg === args.length - 1 ? (
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
                {type}
              </button>
            </div>
            <div>{description}</div>
          </div>
        );
      })}
    </>
  );
};
