import { buildClientSchema } from 'graphql';
import { FC, useEffect, useState } from 'react';
import {
  selectDocsResponseError,
  selectDocsResponseStatus,
  selectDocsResponseValue,
  fetchDocsRequest,
} from 'src/app/slice/DocsSlice';
import { FieldsInfo, Query, ScalarType } from './types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader/Loader';
import { QueriesComponent } from './Queries/index';
import { RootQueryComponent } from './RootQuery/index';
import { QueryDescription } from './QueryDescription/index';
import { FieldsComponent } from './Fields/index';
import { ScalarTypeComponent } from './ScalarType/index';

export const Documents: FC = () => {
  const [history, setHistory] = useState<Array<[string, string]>>([
    ['default', 'Default'],
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

  const getQueryDescription = (type: string) => {
    const schema = buildClientSchema(docsResponseValueFromStorage).getQueryType()?.getFields();
    const x = JSON.stringify(schema);
    const y: Query = JSON.parse(x)[type];
    setQueryItem(y);
    setQueriesFlag('queryDescription');
    setHistory([...history, ['queryDescription', type]]);
  };

  const getFields = (type: string) => {
    const schema = buildClientSchema(docsResponseValueFromStorage).getType(type)?.toConfig();
    const x = JSON.stringify(schema);
    const y = JSON.parse(x);
    const scalar = ['String', 'Boolean', 'ID', 'Int', 'Float'];

    if (scalar.includes(type)) {
      setScalarTypeInfo(y);
      setQueriesFlag('scalarType');
      setHistory([...history, ['scalarType', type]]);
    } else {
      const result = Object.entries(y.fields);
      y.fields = result;
      setFields(y);
      setQueriesFlag('fields');
      setHistory([...history, ['fields', type]]);
    }
  };

  const getHistoryPage = (historyItem: Array<string>) => {
    const value = historyItem[1];
    const obj: { [char: string]: () => void } = {
      root: () => {
        setQueriesFlag('root');
      },
      queries: () => {
        getQueries();
      },
      queryDescription: () => {
        getQueryDescription(value);
      },
      fields: () => {
        getFields(value);
      },
      scalarType: () => {
        getFields(value);
      },
    };

    const key = historyItem[0];
    obj[key]();
    const x = history.slice(0, -1);

    setHistory(x);
  };

  useEffect(() => {
    dispatch(fetchDocsRequest());
  }, [dispatch]);

  return (
    <div className='docs__container docs docs left-[53px] top-[-1px] z-10 ml-2 flex h-[calc(100%+2px)] max-w-[45vh] flex-col overflow-auto rounded-r-md border-l-[1px] border-base_green_light pl-2 text-base font-normal text-base_green xs:text-sm'>
      <div className='docs__content whitespace-break-spaces text-base_dark dark:text-base_white'>
        {history.length >= 3 && (
          <button
            type='button'
            className='text-sm hover:underline'
            onClick={() => {
              const prevPage = history[history.length - 2];
              getHistoryPage(prevPage);
            }}
          >
            <span className='text-md'>&#8249;</span> {history[history.length - 2][1]}
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
          <QueryDescription
            docs={queryItem}
            getField={getFields}
          />
        )}
        {queriesFlag === 'fields' && fields && (
          <FieldsComponent
            docs={fields}
            getField={getFields}
          />
        )}
        {queriesFlag === 'scalarType' && scalarTypeInfo && (
          <ScalarTypeComponent docs={scalarTypeInfo} />
        )}
        {docsResponseStatusFromStorage === 'loading' && (
          <div className='m-auto mt-[20vh] w-fit'>
            <Loader />
          </div>
        )}
        {docsResponseStatusFromStorage === 'failed' && docsResponseErrorFromStorage}
      </div>
    </div>
  );
};
