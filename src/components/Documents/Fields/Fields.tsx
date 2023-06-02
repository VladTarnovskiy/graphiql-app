import { FC } from 'react';
import { FieldsInfo } from '../types';

interface FieldsComponentProps {
  docs: FieldsInfo;
  getField: (el: string) => void;
}

export const FieldsComponent: FC<FieldsComponentProps> = ({ docs, getField }) => {
  return (
    <>
      <div className='title mb-4 pr-8 text-2xl text-base_green'>{docs.name}</div>
      <div className='mb-4'>- Fields:</div>
      {docs.fields.map(([item, { type, description }]) => {
        return (
          <div
            className='wrapper mb-4 text-base_dark dark:text-base_white'
            key={item}
          >
            <div>
              <div className='inline text-base_green'>{item}</div>
              <span>: </span>
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
