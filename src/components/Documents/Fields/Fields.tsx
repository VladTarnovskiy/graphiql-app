import { FieldsInfo } from '../types';

interface MyProps {
  docs: FieldsInfo;
  getField: (el: string) => void;
}

const FieldsComponent = ({ docs, getField }: MyProps) => {
  return (
    <>
      <div className="title text-2xl pr-8 mb-4 text-base_green">{docs.name}</div>
      <div className="mb-4">- Fields:</div>
      {docs.fields.map((item, index) => {
        return (
          <div className="wrapper mb-4 text-base_dark dark:text-base_white" key={index.toString()}>
            <div>
              <div className="text-base_green inline">{item[0]}</div>
              <span>: </span>
              <button
                type="button"
                className="text-base_yellow_dark hover:underline"
                onClick={(e) => {
                  const query = e.currentTarget.textContent!.replace(/[^a-z]/gi, '');
                  getField(query);
                }}
              >
                {item[1].type}
              </button>
            </div>
            <div>{item[1].description}</div>
          </div>
        );
      })}
    </>
  );
};

export default FieldsComponent;
