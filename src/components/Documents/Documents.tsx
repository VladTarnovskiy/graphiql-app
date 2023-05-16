import {
  IntrospectionQuery,
  getIntrospectionQuery,
  buildClientSchema,
  printSchema,
  buildSchema,
} from 'graphql';
import { useEffect, useState } from 'react';

// function buildSchema(source: string | Source): GraphQLSchema {}
// console.log(buildSchema('https://rickandmortyapi.com/graphql'));
// console.log(buildSchema('rickandmortyapi.com/graphql'));

function Documents(): JSX.Element {
  const [docs, setDocs] = useState('');
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

      //   const x = buildClientSchema(data);

      //   const y = printSchema(x);
      //   console.log(x);
      setDocs(editData);
    } catch (e) {
      setDocs(`${e}`);
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <div className="absolute flex flex-col rounded-r-md text-base docs font-normal text-base_green p-2 docs w-[40vh] top-[-1px] left-[53px] z-10 h-[calc(100%+2px)] bg-base_white border-[1px] border-l-0 border-base_green_light overflow-auto">
      <div className="docs__title text-2xl">Documents</div>
      <div className="docs__content text-base_dark whitespace-break-spaces">{docs}</div>
    </div>
  );
}

export default Documents;
