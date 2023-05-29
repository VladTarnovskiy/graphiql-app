import { buildClientSchema } from 'graphql';
import { useEffect, useState } from 'react';
import {
  selectDocsResponseError,
  selectDocsResponseStatus,
  selectDocsResponseValue,
  fetchDocsRequest,
} from 'src/app/slice/DocsSlice';
import { FieldsInfo, Query, ScalarType } from './types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader/Loader';
import { QueriesComponent } from './Queries/Queries';
import { RootQueryComponent } from './RootQuery/RootQuery';
import { QueryDescription } from './QueryDescription/QueryDescription';
import { FieldsComponent } from './Fields/Fields';
import { ScalarTypeComponent } from './ScalarType/ScalarType';

export const Documents = () => {
  const [history, setHistory] = useState<Array<[string, string]>>([
    ['', ''],
    ['root', 'Docs'],
  ]);
  const [docs, setDocs] = useState<Array<Query>>();
  const [queryItem, setQueryItem] = useState<Query>();
  const [fields, setFields] = useState<FieldsInfo>();
  const [scalarTypeInfo, setScalarTypeInfo] = useState<ScalarType>();

  const [queriesFlag, setQueriesFlag] = useState('root');

  const dispatch = useAppDispatch();
  const docsResponseValueFromStorage = useAppSelector(selectDocsResponseValue);
  const docsResponseStatusFromStorage = useAppSelector(selectDocsResponseStatus);
  const docsResponseErrorFromStorage = useAppSelector(selectDocsResponseError);

  const getQueries = () => {
    const schema = buildClientSchema(docsResponseValueFromStorage).getQueryType()?.getFields();
    const x = JSON.stringify(schema);
    const y: Query[] = Object.values(JSON.parse(x));

    setDocs(y);
    setQueriesFlag('queries');
    setHistory([...history, ['queries', 'Query']]);
  };

  const getQueryDescription = (el: string) => {
    const schema = buildClientSchema(docsResponseValueFromStorage).getQueryType()?.getFields();
    const x = JSON.stringify(schema);
    const y: Query = JSON.parse(x)[el];

    setQueryItem(y);
    setQueriesFlag('queryDescription');
    setHistory([...history, ['queryDescription', el]]);
  };

  const getFields = (el: string) => {
    const schema = buildClientSchema(docsResponseValueFromStorage).getType(el)?.toConfig();
    const x = JSON.stringify(schema);
    const y = JSON.parse(x);
    const scalar = ['String', 'Boolean', 'ID', 'Int', 'Float'];

    if (scalar.includes(el)) {
      setScalarTypeInfo(y);
      setQueriesFlag('scalarType');
      setHistory([...history, ['scalarType', el]]);
    } else {
      const result = Object.entries(y.fields);
      y.fields = result;

      setFields(y);
      setQueriesFlag('fields');
      setHistory([...history, ['fields', el]]);
    }
  };

  const getHistoryPage = (el: Array<string>) => {
    const obj: { [char: string]: () => void } = {
      root: () => {
        setQueriesFlag('root');
      },
      queries: () => {
        getQueries();
      },
      queryDescription: () => {
        getQueryDescription(el[1]);
      },
      fields: () => {
        getFields(el[1]);
      },
      scalarType: () => {
        getFields(el[1]);
      },
    };

    const key = el[0];
    obj[key]();
    const x = history.slice(0, -1);

    setHistory(x);
  };

  useEffect(() => {
    dispatch(fetchDocsRequest());
  }, []);

  return (
    <div className="docs__container flex flex-col border-l-[1px] border-base_green_light pl-2 ml-3 rounded-r-md text-base docs font-normal text-base_green docs xs:text-sm max-w-[45vh] top-[-1px] left-[53px] z-10 h-[calc(100%+2px)] overflow-auto">
      <div className="docs__content text-base_dark whitespace-break-spaces dark:text-base_white">
        {history.length >= 3 && (
          <button
            type="button"
            className="text-sm hover:underline"
            onClick={() => {
              const prevPage = history[history.length - 2];
              getHistoryPage(prevPage);
            }}
          >
            <span className="text-md">&#8249;</span> {history[history.length - 2][1]}
          </button>
        )}
        {queriesFlag === 'root' && docsResponseStatusFromStorage === 'succeeded' && (
          <RootQueryComponent getQueries={getQueries} />
        )}
        {queriesFlag === 'queries' && docs && (
          <QueriesComponent
            docs={docs}
            getField={getFields}
            getQueryDescription={getQueryDescription}
          />
        )}
        {queriesFlag === 'queryDescription' && queryItem && (
          <QueryDescription docs={queryItem} getField={getFields} />
        )}
        {queriesFlag === 'fields' && fields && (
          <FieldsComponent docs={fields} getField={getFields} />
        )}
        {queriesFlag === 'scalarType' && scalarTypeInfo && (
          <ScalarTypeComponent docs={scalarTypeInfo} />
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
};
