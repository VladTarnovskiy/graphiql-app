import { Query } from '../typeTwo';

interface MyProps {
  docs: Array<Query>;
  getField: (el: string) => void;
}

function FieldsComponent(props: MyProps): JSX.Element {
  const { docs, getField } = props;
  return (
    <>
      <div className="title">Queries</div>
      {docs.map((item, index) => {
        return (
          <div className="wrapper mb-4 text-base_dark dark:text-base_white" key={index.toString()}>
            <div>
              <button type="button" className="text-base_green hover:underline">
                {item.name}
              </button>
              <span>: </span>
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
}

export default FieldsComponent;
