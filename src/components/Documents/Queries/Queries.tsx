import { FC } from 'react';
import { Query } from '../types';

interface QueriesComponentProps {
  docs: Array<Query>;
  getField: (el: string) => void;
  getQueryDescription: (el: string) => void;
}

export const QueriesComponent: FC<QueriesComponentProps> = ({
  docs,
  getField,
  getQueryDescription,
}) => {
  return (
    <>
      <div className='title mb-4 pr-8 text-2xl text-base_green'>Queries</div>
      {docs.map(({ name, args, type, description }) => {
        return (
          <div
            className='wrapper mb-4 text-base_dark dark:text-base_white'
            key={name}
          >
            <div>
              <button
                type='button'
                className='text-base_green hover:underline'
                onClick={(e) => {
                  const content = e.currentTarget.textContent;
                  if (content) {
                    getQueryDescription(content);
                  }
                }}
              >
                {name}
              </button>
              <span>(</span>
              {args.map(({ name: argName, type: argType }, indexArg) => {
                return (
                  <span
                    className='text-base_yellow'
                    key={argName}
                  >
                    <span className='text-base_red'>{argName}:</span>{' '}
                    <button
                      type='button'
                      className='text-base_yellow_dark hover:underline'
                      onClick={(e) => {
                        const query = e.currentTarget.textContent?.replace(/[^a-z]/gi, '');
                        if (query) {
                          getField(query);
                        }
                      }}
                    >
                      {argType}
                    </button>
                    {indexArg === args.length - 1 ? (
                      ''
                    ) : (
                      <span className='text-base_dark dark:text-base_white'>, </span>
                    )}
                  </span>
                );
              })}
              <span>): </span>
              <button
                type='button'
                className='text-base_yellow_dark hover:underline'
                onClick={(e) => {
                  const query = e.currentTarget.textContent?.replace(/[^a-z]/gi, '');
                  if (query) {
                    getField(query);
                  }
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
