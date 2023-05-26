import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from 'src/utils/firebase';
import toast, { Toaster } from 'react-hot-toast';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import './codemirror.scss';

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
  setHistoryItem,
  fetchDataRequest,
} from 'src/app/slice/GraphiqlPageSlice';
import Loader from 'src/components/Loader/Loader';
import Documents from 'src/components/Documents/Documents';
import HistoryComponent from 'src/components/Documents/History/History';
import { Tooltip } from 'react-tooltip';
import { selectTheme } from 'src/app/slice/SettingsSlice';
import { myDarkTheme, myLightTheme } from 'src/utils/codemirror-set';
import Textarea from '../../components/Textarea/Textarea';
import Play from '../../assets/play.svg';
import Stop from '../../assets/stop.svg';
import Docs from '../../assets/docs.svg';
import Copy from '../../assets/copy.svg';
import History from '../../assets/history.svg';
import Broom from '../../assets/broom.svg';
import Modal from '../../components/Modal/Modal';
import SettingModal from '../../components/SettingModal/SettingModal';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

function GraphiQLPage(): JSX.Element {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [settingsFlag, setSettingsFlag] = useState(false);
  const [fieldFlag, setFieldFlag] = useState(false);
  const [docs, setDocs] = useState(false);
  const [history, setHistory] = useState(false);
  const [variablesBlock, setVariablesBlock] = useState(true);
  const headersValueFromStorage = useAppSelector(selectHeadersValue);
  const variablesValueFromStorage = useAppSelector(selectVariablesValue);
  const inputDataValueFromStorage = useAppSelector(selectInputDataValue);
  const responseValueFromStorage = useAppSelector(selectResponseValue);
  const responseStatusFromStorage = useAppSelector(selectResponseStatus);
  const responseErrorFromStorage = useAppSelector(selectResponseError);
  const themeFromStore = useAppSelector(selectTheme);

  const dispatch = useAppDispatch();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  });

  const getData = async () => {
    await dispatch(
      fetchDataRequest({
        query: `${inputDataValueFromStorage}`,
        variables: variablesValueFromStorage,
        headers: headersValueFromStorage,
      })
    );
  };

  const changeRequestInputs = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.target as Element;
    if (el.classList.contains('variables')) {
      setFieldFlag(false);
      sliderRef.current!.style.transform = 'translateX(0)';
    } else {
      setFieldFlag(true);
      sliderRef.current!.style.transform = 'translateX(117%)';
    }
  };

  return (
    <div
      className="relative graphql basis-1/8 flex-grow-1 flex justify-center pl-[62px] md:pl-[54px] dark:bg-base_dark"
      data-testid="graphiql-element"
    >
      <Toaster />
      {settingsFlag && (
        <Modal setCloseFlag={setSettingsFlag}>
          <SettingModal />
        </Modal>
      )}
      <div className="absolute left-0 top-0 instruments z-10 flex justify-start p-2 pl-[8px] md:pl-[7px] docs-nav h-full dark:bg-dark_textarea w-[60px] md:w-[50px] min-h-[79vh] shadow-lg shadow-base_green/50 rounded-r-md bg-base_white">
        <div className="flex flex-col justify-start">
          <Tooltip
            id="button-tooltip"
            style={{ fontSize: '1rem', textAlign: 'center' }}
            className="dark:bg-base_white dark:text-base_dark"
          />
          <button
            className="play rounded-full pl-[7px] md:pl-[6px] w-11 h-11 md:w-9 md:h-9 mb-6 hover:scale-105 bg-base_green_light active:scale-100 cursor-pointer transition ease-in-out delay-75"
            type="button"
            data-tooltip-id="button-tooltip"
            data-tooltip-content={t('GraphQL.NavButtons.Play')!}
            data-tooltip-place="right"
            onClick={() => {
              getData();
              dispatch(setHistoryItem());
            }}
          >
            {responseStatusFromStorage !== 'loading' && (
              <img src={Play} alt="Play" className="w-[30px] md:w-[24px]" />
            )}
            {responseStatusFromStorage === 'loading' && (
              <img src={Stop} alt="Stop" className="w-[30px] md:w-[24px]" />
            )}
          </button>
          <button
            className="docs rounded-full w-11 h-11 md:w-9 md:h-9 hover:opacity-60 hover:scale-105 active:scale-100 cursor-pointer transition ease-in-out mb-4 delay-75"
            type="button"
            data-tooltip-id="button-tooltip"
            data-tooltip-content={t('GraphQL.NavButtons.Documents')!}
            data-tooltip-place="right"
            onClick={() => {
              setDocs(!docs);
              setHistory(false);
            }}
          >
            <img src={Docs} alt="Docs" />
          </button>
          <button
            className="history rounded-full w-10 h-10 md:w-9 md:h-9 hover:opacity-60 hover:scale-105 active:scale-100 cursor-pointer transition ease-in-out mb-4 delay-75"
            type="button"
            data-tooltip-id="button-tooltip"
            data-tooltip-content={t('GraphQL.NavButtons.History')!}
            data-tooltip-place="right"
            onClick={() => {
              setHistory(!history);
              setDocs(false);
            }}
          >
            <img src={History} alt="History" />
          </button>
          <button
            className="copy rounded-full w-10 h-10 hover:opacity-60 md:w-9 md:h-9 hover:scale-105 active:scale-100 cursor-pointer transition ease-in-out mb-4 delay-75"
            type="button"
            data-tooltip-id="button-tooltip"
            data-tooltip-content={t('GraphQL.NavButtons.Copy')!}
            data-tooltip-place="right"
            onClick={() => {
              navigator.clipboard.writeText(inputDataValueFromStorage);
              toast.success(t('GraphQL.Toasts.Copy'));
            }}
          >
            <img src={Copy} alt="Copy" />
          </button>
          <button
            className="cleaner rounded-full w-10 h-10 hover:opacity-60 md:w-9 md:h-9 hover:scale-105 active:scale-100 cursor-pointer transition ease-in-out mb-4 delay-75"
            type="button"
            data-tooltip-id="button-tooltip"
            data-tooltip-content={t('GraphQL.NavButtons.Clean')!}
            data-tooltip-place="right"
            onClick={() => {
              dispatch(setInputData(''));
              dispatch(setVariables('{}'));
              dispatch(setHeaders('{}'));
              toast.success(t('GraphQL.Toasts.Clean'));
            }}
          >
            <img src={Broom} alt="Cleaner" />
          </button>
        </div>
        <div className="documents">{docs && <Documents />}</div>
        <div className="history">
          {history && (
            <HistoryComponent
              onClose={() => {
                setHistory(false);
              }}
            />
          )}
        </div>
      </div>
      <div className="flex w-full md:flex-col ml-2">
        <div className="request mr-4 flex flex-col rounded-md h-[79vh] md:mb-2 shadow-lg shadow-base_green/50 w-[50%] md:w-full">
          <div className="overflow-y-auto request__wrap h-full shadow-xl relative rounded-tr-md rounded-tl-md bg-base_white dark:bg-dark_textarea xs:text-sm">
            {/* <textarea
              ref={textRef}
              className="w-full h-full query p-4 rounded-tr-md rounded-tl-md bg-base_white outline-0 mb-[-8px] resize-none xs:text-sm dark:bg-dark_textarea dark:text-base_white"
              value={inputDataValueFromStorage}
              onChange={(e) => {
                dispatch(setInputData(e.target.value));
              }}
            /> */}
            <CodeMirror
              value={inputDataValueFromStorage}
              className="my-code-mirror"
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
          <div className="request__inputs h-fit border-t-[1px] border-base_green_light rounded-br-md rounded-bl-md flex flex-col">
            <div className="relative request__nav flex justify-left pl-4 pr-4 text-sm bg-base_white pb-2  dark:bg-dark_textarea dark:text-base_white">
              <button
                type="button"
                className="butShow absolute top-1 right-2 text-2xl transition ease-in-out"
                onClick={(e) => {
                  setVariablesBlock(!variablesBlock);
                  if (variablesBlock) {
                    e.currentTarget.classList.add('rotate-180');
                  } else {
                    e.currentTarget.classList.remove('rotate-180');
                  }
                }}
              >
                <svg className="w-6 h-6" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                  <path fill="#14b8a6" d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                </svg>
              </button>
              <button
                className="request__nav__item variables w-24 md:w-20 mr-4 hover:text-base_green cursor-pointer text-center"
                onClick={changeRequestInputs}
                type="button"
              >
                {t('GraphQL.Variables')}
              </button>
              <button
                className="request__nav__item w-24 md:w-20 hover:text-base_green cursor-pointer text-center"
                onClick={changeRequestInputs}
                type="button"
              >
                {t('GraphQL.Headers')}
              </button>
              <div
                className="switcher w-24 md:w-20 h-[1px] absolute left-4 bottom-2 bg-base_green_light transition ease-in-out"
                ref={sliderRef}
              />
            </div>
            <div className="variables-wrapper">
              {variablesBlock && !fieldFlag && (
                <Textarea value={variablesValueFromStorage} setVariables={setVariables} />
              )}
              {variablesBlock && fieldFlag && (
                <Textarea value={headersValueFromStorage} setVariables={setHeaders} />
              )}
            </div>
          </div>
        </div>
        <div className="response max-h-[79vh] w-[50%] md:w-full xs:text-sm whitespace-break-spaces shadow-lg shadow-base_green/50 p-4 rounded-md bg-base_white overflow-y-auto dark:bg-dark_textarea dark:text-base_white">
          {responseStatusFromStorage === 'succeeded' && responseValueFromStorage}
          {responseStatusFromStorage === 'loading' && (
            <div className="m-auto w-fit mt-[30vh]">
              <Loader />
            </div>
          )}
          {responseStatusFromStorage === 'failed' && responseErrorFromStorage}
        </div>
      </div>
    </div>
  );
}

export default GraphiQLPage;
