import {
  IntrospectionQuery,
  getIntrospectionQuery,
  buildClientSchema,
  printSchema,
  buildSchema,
  GraphQLObjectType,
} from 'graphql';
import { useEffect, useState } from 'react';
import {
  selectDocsResponseError,
  selectDocsResponseStatus,
  selectDocsResponseValue,
  fetchDocsRequest,
} from 'src/app/slice/DocsSlice';
import { Fields } from './typeTwo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loader from '../Loader/Loader';
import FieldsComponent from './Fields/Fields';
import RootQueryComponent from './RootQuery/RootQuery';

function Documents(): JSX.Element {
  const [docs, setDocs] = useState<Array<Fields>>();
  const [fieldsFlag, setFieldsFlag] = useState(false);

  const dispatch = useAppDispatch();
  const docsResponseValueFromStorage = useAppSelector(selectDocsResponseValue);
  const docsResponseStatusFromStorage = useAppSelector(selectDocsResponseStatus);
  const docsResponseErrorFromStorage = useAppSelector(selectDocsResponseError);

  const getFields = () => {
    const schema = buildClientSchema(docsResponseValueFromStorage).getQueryType()?.getFields();
    const x = JSON.stringify(schema);
    const z: Fields[] = Object.values(JSON.parse(x));
    console.log(z);
    setDocs(z);
    setFieldsFlag(true);
  };

  const getField = (el: string) => {
    const schema = buildClientSchema(docsResponseValueFromStorage).getType(el);
    // const schema = buildClientSchema(docsResponseValueFromStorage).getType('__Schema');
    // const x = JSON.stringify(schema);
    // const z: Fields[] = Object.values(JSON.parse(x));
    console.log(schema);
    // setDocs(z);
    // setFieldsFlag(true);
  };

  useEffect(() => {
    dispatch(fetchDocsRequest());
    // getField('Character');
  }, []);

  return (
    <div className="docs__container flex flex-col border-l-[1px] border-base_green_light pl-2 ml-3 rounded-r-md text-base docs font-normal text-base_green docs xs:text-sm max-w-[45vh] top-[-1px] left-[53px] z-10 h-[calc(100%+2px)] overflow-auto">
      <div className="docs__title text-2xl pr-8 mb-2">Documents</div>
      <div className="docs__content text-base_dark whitespace-break-spaces dark:text-base_white">
        {!fieldsFlag && docsResponseStatusFromStorage === 'succeeded' && (
          <RootQueryComponent getFields={getFields} />
        )}
        {fieldsFlag && docs && <FieldsComponent docs={docs} getField={getField} />}
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
