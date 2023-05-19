import {
  IntrospectionQuery,
  getIntrospectionQuery,
  buildClientSchema,
  printSchema,
  buildSchema,
  GraphQLObjectType,
} from 'graphql';
import { useEffect, useState } from 'react';
import { Fields } from './typeTwo';
// import {
//   selectDocsResponseError,
//   selectDocsResponseStatus,
//   selectDocsResponseValue,
//   fetchDocsRequest,
// } from 'src/app/slice/DocsSlice';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loader from '../Loader/Loader';

// function buildSchema(source: string | Source): GraphQLSchema {}
// console.log(buildSchema('https://rickandmortyapi.com/graphql'));
// console.log(buildSchema('rickandmortyapi.com/graphql'));

function Documents(): JSX.Element {
  const [docs, setDocs] = useState<Array<Fields>>();
  const getData = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // ...JSON.parse(headersInput),
        },
        body: JSON.stringify({
          query: getIntrospectionQuery(),
        }),
      });
      const data = await response.json();
      const editData = JSON.stringify(data, null, '\t');
      const datax = data.data;
      const schema = buildClientSchema(datax).getQueryType()?.getFields();
      // const schema = buildClientSchema(datax).getType('__Schema');
      // const x = JSON.stringify(schema);
      // const z: Fields = JSON.parse(x);

      // const editData = JSON.stringify(schema, null, '\t');
      const x = JSON.stringify(schema);
      const z: Fields[] = Object.values(JSON.parse(x));
      // const z = JSON.parse(x);
      // const arr: [Fields] = [];
      // z.forEach((item) => {
      //   arr.push(item);
      // });

      console.log(z);
      // setDocs(schema);
      setDocs(z);
    } catch (e) {
      // setDocs(`${e}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col border-l-[1px] border-base_green_light pl-2 ml-3 rounded-r-md text-base docs font-normal text-base_green docs xs:text-sm max-w-[45vh] top-[-1px] left-[53px] z-10 h-[calc(100%+2px)] overflow-auto">
      <div className="docs__title text-2xl pr-8">Documents</div>
      <div className="docs__content text-base_dark whitespace-break-spaces dark:text-base_white">
        <div className="root__description mb-2">
          A GraphQL schema provides a root type for each kind of operation.
        </div>
        <div className="root__title mb-2">- Root Types</div>
        <div className="root__link">
          query:{' '}
          <button
            className="types__link text-base_green hover:text-base_yellow hover:underline"
            type="button"
            // onClick={}
          >
            Query
          </button>
        </div>
        <div className="docs__content text-base_dark whitespace-break-spaces">
          {docs?.map((item, index) => {
            return (
              <div className="wrapper mb-2" key={index.toString()}>
                <div className="text-base_green">
                  {item.name}(
                  {item.args.map((itemArg, indexArg) => {
                    return (
                      <span className="text-base_yellow" key={indexArg.toString()}>
                        <span className="text-base_red">${itemArg.name}:</span>{' '}
                        <span className="text-base_yellow_dark">{itemArg.type}</span>
                        {indexArg === item.args.length - 1 ? '' : <span>, </span>}
                      </span>
                    );
                  })}
                  )
                </div>
                <div>{item.description}</div>
                {/* <div>
                  {item.args.map((itemArg, indexArg) => {
                    return <span key={indexArg.toString()}>name:{itemArg.name}</span>;
                  })}
                </div> */}
              </div>
            );
          })}
          {/* {console.log(docs)} */}
        </div>
        {/* {docsResponseStatusFromStorage === 'succeeded' && docsResponseValueFromStorage}
        {docsResponseStatusFromStorage === 'loading' && (
          <div className="m-auto w-fit mt-[20vh]">
            <Loader />
          </div>
        )}
        {docsResponseStatusFromStorage === 'failed' && docsResponseErrorFromStorage} */}
      </div>
    </div>
  );
}

export default Documents;
