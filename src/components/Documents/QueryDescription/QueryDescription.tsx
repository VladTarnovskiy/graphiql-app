import { FC } from 'react';
import { Query } from '../types';

interface QueryDescriptionProps {
  docs: Query;
  getField: (el: string) => void;
}

export const QueryDescription: FC<QueryDescriptionProps> = ({ docs, getField }) => {
  return (
    <>
      <div className='title text-2xl pr-8 mb-4 text-base_green'>{docs.name}</div>
      <div className='mb-4'>{docs.description}</div>
      <div className='wrapper mb-4 text-base_dark dark:text-base_white'>
        <div className='flex flex-col items-start'>
          <div className='type__title'>- Type:</div>
          <button
            type='button'
            className='text-base_green hover:underline mb-4'
            onClick={(e) => {
              const query = e.currentTarget.textContent?.replace(/[^a-z]/gi, '');
              if (query) {
                getField(query);
              }
            }}
          >
            {docs.type}
          </button>
          <div>- Args:</div>
          {docs.args.map(({ name, type }) => {
            return (
              <span
                className='text-base_yellow'
                key={name}
              >
                <span className='text-base_red'>{name}:</span>{' '}
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
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
};
