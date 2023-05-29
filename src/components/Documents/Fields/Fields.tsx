import { FC } from 'react';
import { FieldsInfo } from '../types';

interface IFieldsComponent {
  docs: FieldsInfo;
  getField: (el: string) => void;
}

export const FieldsComponent: FC<IFieldsComponent> = ({ docs, getField }) => {
  return (
    <>
      <div className="title text-2xl pr-8 mb-4 text-base_green">{docs.name}</div>
      <div className="mb-4">- Fields:</div>
      {docs.fields.map(([item, { type, description }]) => {
        return (
          <div className="wrapper mb-4 text-base_dark dark:text-base_white" key={item}>
            <div>
              <div className="text-base_green inline">{item}</div>
              <span>: </span>
              <button
                type="button"
                className="text-base_yellow_dark hover:underline"
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
