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
      className='relative graphql basis-1/8 flex-grow-1 flex justify-center pl-[62px] md:pl-[54px] dark:bg-base_dark'
      data-testid='graphiql-element'
    >
      <Instruments getData={getData} />
      <Toaster />
      <div className='flex w-full md:flex-col ml-2'>
        <div className='request mr-4 flex flex-col rounded-md h-[79vh] md:mb-2 shadow-lg shadow-base_green/50 w-[50%] md:w-full'>
          <div className='overflow-y-auto request__wrap h-full shadow-xl relative rounded-tr-md rounded-tl-md bg-base_white dark:bg-dark_textarea xs:text-sm'>
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
          <div className='request__inputs h-fit border-t-[1px] border-base_green_light rounded-br-md rounded-bl-md flex flex-col'>
            <div className='relative request__nav flex justify-left pl-4 pr-4 text-sm bg-base_white pb-2 rounded dark:bg-dark_textarea dark:text-base_white'>
              <button
                type='button'
                className={clsx('butShow absolute top-1 right-2 text-2xl transition ease-in-out', {
                  'rotate-180': variablesBlock,
                })}
                onClick={() => {
                  setVariablesBlock(!variablesBlock);
                }}
              >
                <svg
                  className='w-6 h-6'
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
                className='request__nav__item variables w-24 md:w-20 mr-4 hover:text-base_green cursor-pointer text-center'
                onClick={() => setFieldFlag('variables')}
                type='button'
              >
                {t('GraphQL.Variables')}
              </button>
              <button
                className='request__nav__item w-24 md:w-20 hover:text-base_green cursor-pointer text-center'
                onClick={() => setFieldFlag('headers')}
                type='button'
              >
                {t('GraphQL.Headers')}
              </button>
              <div
                className={clsx(
                  'switcher w-24 md:w-20 h-[1px] absolute left-4 bottom-2 bg-base_green_light transition ease-in-out',
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
        <div className='response max-h-[79vh] min-h-[50px] w-[50%] md:w-full xs:text-sm whitespace-break-spaces shadow-lg shadow-base_green/50 rounded-md bg-base_white overflow-y-auto dark:bg-dark_textarea dark:text-base_white'>
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
            <div className='m-auto w-fit mt-[30vh]'>
              <Loader />
            </div>
          )}
          {responseStatusFromStorage === 'failed' && responseErrorFromStorage}
        </div>
      </div>
    </div>
  );
}
