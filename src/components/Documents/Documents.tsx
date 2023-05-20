import {
  IntrospectionQuery,
  getIntrospectionQuery,
  buildClientSchema,
  printSchema,
  buildSchema,
  GraphQLObjectType,
  parseType,
  parseValue,
  valueFromAST,
  getNamedType,
  typeFromAST,
  print,
  printType,
  __Field,
  defaultFieldResolver,
  defaultTypeResolver,
} from 'graphql';

import { useEffect, useState } from 'react';
import {
  selectDocsResponseError,
  selectDocsResponseStatus,
  selectDocsResponseValue,
  fetchDocsRequest,
} from 'src/app/slice/DocsSlice';
import { json } from 'react-router-dom';
import { Query } from './typeTwo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loader from '../Loader/Loader';
import QueriesComponent from './Queries/Queries';
import RootQueryComponent from './RootQuery/RootQuery';
import QueryDescription from './QueryDescription/QueryDescription';

function Documents(): JSX.Element {
  const [docs, setDocs] = useState<Array<Query>>();
  const [queryitem, setQueryitem] = useState<Query>();
  const [queriesFlag, setQueriesFlag] = useState('root');

  const dispatch = useAppDispatch();
  const docsResponseValueFromStorage = useAppSelector(selectDocsResponseValue);
  const docsResponseStatusFromStorage = useAppSelector(selectDocsResponseStatus);
  const docsResponseErrorFromStorage = useAppSelector(selectDocsResponseError);

  const getQueries = () => {
    const schema = buildClientSchema(docsResponseValueFromStorage).getQueryType()?.getFields();
    const x = JSON.stringify(schema);
    const z: Query[] = Object.values(JSON.parse(x));
    console.log(z);
    setDocs(z);
    setQueriesFlag('queries');
  };

  const getQueryDescription = (el: string) => {
    const schema = buildClientSchema(docsResponseValueFromStorage).getQueryType()?.getFields();
    const x = JSON.stringify(schema);
    const z: Query = JSON.parse(x)[el];
    console.log(el);
    setQueryitem(z);
    setQueriesFlag('queryDescription');
  };

  const getTypeInfo = (el: string) => {
    const schema = buildClientSchema(docsResponseValueFromStorage).getType(el);
    // const schema = buildClientSchema(docsResponseValueFromStorage).getTypeMap();
    // const x = JSON.stringify(schemax);
    // const typeNode = typeFromAST(schemax, x);
    // const typeNode = printType(x!);
    // const z = Object.values(schema);
    // const y = JSON.parse(JSON.stringify(z))
    // const z: Query[] = Object.values(JSON.parse(x));
    // console.log(z);
    console.log(schema);
    // setQueriesFlag('typeInfo');
  };

  useEffect(() => {
    dispatch(fetchDocsRequest());
    // getField('Character');
  }, []);

  return (
    <div className="docs__container flex flex-col border-l-[1px] border-base_green_light pl-2 ml-3 rounded-r-md text-base docs font-normal text-base_green docs xs:text-sm max-w-[45vh] top-[-1px] left-[53px] z-10 h-[calc(100%+2px)] overflow-auto">
      <div className="docs__content text-base_dark whitespace-break-spaces dark:text-base_white">
        {queriesFlag === 'root' && docsResponseStatusFromStorage === 'succeeded' && (
          <RootQueryComponent getQueries={getQueries} />
        )}
        {queriesFlag === 'queries' && docs && (
          <QueriesComponent
            docs={docs}
            getField={getTypeInfo}
            getQueryDescription={getQueryDescription}
          />
        )}
        {queriesFlag === 'queryDescription' && queryitem && (
          <QueryDescription docs={queryitem} getField={getTypeInfo} />
        )}
        {docsResponseStatusFromStorage === 'loading' && (
          <div className="m-auto w-fit mt-[20vh]">
            <Loader />
          </div>
        )}
        {docsResponseStatusFromStorage === 'failed' && docsResponseErrorFromStorage}
      </div>
    </div>
  );
}

export default Documents;
