import { Fields } from '../typeTwo';

interface MyProps {
  docs: Array<Fields>;
  getField: (el: string) => void;
}

function FieldsComponent(props: MyProps): JSX.Element {
  const { docs, getField } = props;
  return (
    <>
      {docs.map((item, index) => {
        return (
          <div className="wrapper mb-4 text-base_dark dark:text-base_white" key={index.toString()}>
            <div>
              <button type="button" className="text-base_green hover:underline">
                {item.name}
              </button>
              <span>(</span>
              {item.args.map((itemArg, indexArg) => {
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
}

export default FieldsComponent;
