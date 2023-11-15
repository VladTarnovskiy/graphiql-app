import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'react-hot-toast';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import './codemirror.scss';
import { clsx } from 'clsx';
import {
  selectHeadersValue,
  selectVariablesValue,
  selectInputDataValue,
  selectResponseValue,
  selectResponseStatus,
  selectResponseError,
  setInputData,
  setHeaders,
  setVariables,
  fetchDataRequest,
} from 'src/app/slice/GraphiqlPageSlice';
import { Loader } from 'src/components/Loader/Loader';
import { selectTheme } from 'src/app/slice/SettingsSlice';
import { myDarkTheme, myLightTheme } from 'src/utils/codemirror-set';
import { Instruments } from 'src/components/Instruments/Instruments';
import { Textarea } from 'src/components/Textarea/Textarea';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';

type Fields = 'headers' | 'variables';

export default function GraphiQLPage() {
  const { t } = useTranslation();
  const [fieldFlag, setFieldFlag] = useState<Fields>('variables');
  const [variablesBlock, setVariablesBlock] = useState(true);
  const headersValueFromStorage = useAppSelector(selectHeadersValue);
  const variablesValueFromStorage = useAppSelector(selectVariablesValue);
  const inputDataValueFromStorage = useAppSelector(selectInputDataValue);
  const responseValueFromStorage = useAppSelector(selectResponseValue);
  const responseStatusFromStorage = useAppSelector(selectResponseStatus);
  const responseErrorFromStorage = useAppSelector(selectResponseError);
  const themeFromStore = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const getData = async () => {
    await dispatch(
      fetchDataRequest({
        query: `${inputDataValueFromStorage}`,
        variables: variablesValueFromStorage,
        headers: headersValueFromStorage,
      }),
    );
  };

  return (
    <div
      className='graphql basis-1/8 flex-grow-1 relative flex justify-center pl-[62px] dark:bg-base_dark md:pl-[54px]'
      data-testid='graphiql-element'
    >
      <Instruments getData={getData} />
      <Toaster />
      <div className='ml-2 flex w-full md:flex-col'>
        <div className='request mr-4 flex h-[79vh] w-[50%] flex-col rounded-md shadow-md shadow-base_green/50 md:mb-2 md:w-full'>
          <div className='request__wrap relative h-full overflow-y-auto rounded-tl-md rounded-tr-md bg-base_white shadow-xl dark:bg-dark_textarea xs:text-sm'>
            <CodeMirror
              value={inputDataValueFromStorage}
              className='my-code-mirror'
              extensions={[javascript({ jsx: true })]}
              theme={themeFromStore === 'light' ? myLightTheme : myDarkTheme}
              basicSetup={{
                lineNumbers: false,
              }}
              onChange={(e) => {
                dispatch(setInputData(e));
              }}
            />
          </div>
          <div className='request__inputs flex h-fit flex-col rounded-bl-md rounded-br-md border-t-[1px] border-base_green_light'>
            <div className='request__nav justify-left relative flex rounded bg-base_white pb-2 pl-4 pr-4 text-sm dark:bg-dark_textarea dark:text-base_white'>
              <button
                type='button'
                className={clsx('butShow absolute right-2 top-1 text-2xl transition ease-in-out', {
                  'rotate-180': variablesBlock,
                })}
                onClick={() => {
                  setVariablesBlock(!variablesBlock);
                }}
              >
                <svg
                  className='h-6 w-6'
                  focusable='false'
                  aria-hidden='true'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='#14b8a6'
                    d='M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z'
                  />
                </svg>
              </button>
              <button
                className='request__nav__item variables mr-4 w-24 cursor-pointer text-center hover:text-base_green md:w-20'
                onClick={() => setFieldFlag('variables')}
                type='button'
              >
                {t('GraphQL.Variables')}
              </button>
              <button
                className='request__nav__item w-24 cursor-pointer text-center hover:text-base_green md:w-20'
                onClick={() => setFieldFlag('headers')}
                type='button'
              >
                {t('GraphQL.Headers')}
              </button>
              <div
                className={clsx(
                  'switcher absolute bottom-2 left-4 h-[1px] w-24 bg-base_green_light transition ease-in-out md:w-20',
                  fieldFlag === 'variables' ? 'translate-x-0' : 'translate-x-[117%]',
                )}
              />
            </div>
            <div className='variables-wrapper'>
              {variablesBlock && fieldFlag === 'variables' && (
                <Textarea
                  value={variablesValueFromStorage}
                  setVariables={setVariables}
                />
              )}
              {variablesBlock && fieldFlag === 'headers' && (
                <Textarea
                  value={headersValueFromStorage}
                  setVariables={setHeaders}
                />
              )}
            </div>
          </div>
        </div>
        <div className='response max-h-[79vh] min-h-[50px] w-[50%] overflow-y-auto whitespace-break-spaces rounded-md bg-base_white shadow-md shadow-base_green/50 dark:bg-dark_textarea dark:text-base_white md:w-full xs:text-sm'>
          {responseStatusFromStorage === 'succeeded' && (
            <CodeMirror
              value={responseValueFromStorage}
              className='my-code-mirror'
              extensions={[javascript({ jsx: true })]}
              theme={themeFromStore === 'light' ? myLightTheme : myDarkTheme}
              basicSetup={{
                lineNumbers: false,
              }}
            />
          )}
          {responseStatusFromStorage === 'loading' && (
            <div className='m-auto mt-[30vh] w-fit'>
              <Loader />
            </div>
          )}
          {responseStatusFromStorage === 'failed' && responseErrorFromStorage}
        </div>
      </div>
    </div>
  );
}
