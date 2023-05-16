import {
  IntrospectionQuery,
  getIntrospectionQuery,
  buildClientSchema,
  printSchema,
  buildSchema,
} from 'graphql';
import { useEffect } from 'react';
import {
  selectDocsResponseError,
  selectDocsResponseStatus,
  selectDocsResponseValue,
  fetchDocsRequest,
} from 'src/app/slice/DocsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loader from '../Loader/Loader';

// function buildSchema(source: string | Source): GraphQLSchema {}
// console.log(buildSchema('https://rickandmortyapi.com/graphql'));
// console.log(buildSchema('rickandmortyapi.com/graphql'));

function Documents(): JSX.Element {
  const dispatch = useAppDispatch();
  const docsResponseValueFromStorage = useAppSelector(selectDocsResponseValue);
  const docsResponseStatusFromStorage = useAppSelector(selectDocsResponseStatus);
  const docsResponseErrorFromStorage = useAppSelector(selectDocsResponseError);

  useEffect(() => {
    dispatch(fetchDocsRequest());
  }, []);

  return (
    <div className="absolute flex flex-col rounded-r-md text-base docs font-normal text-base_green p-2 docs w-[40vh] top-[-1px] left-[53px] z-10 h-[calc(100%+2px)] bg-base_white border-[1px] border-l-0 border-base_green_light overflow-auto">
      <div className="docs__title text-2xl">Documents</div>
      <div className="docs__content text-base_dark whitespace-break-spaces">
        {docsResponseStatusFromStorage === 'succeeded' && docsResponseValueFromStorage}
        {docsResponseStatusFromStorage === 'loading' && (
          <div className="m-auto w-fit mt-[30vh]">
            <Loader />
          </div>
        )}
        {docsResponseStatusFromStorage === 'failed' && docsResponseErrorFromStorage}
      </div>
    </div>
  );
}

export default Documents;
