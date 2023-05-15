import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  IntrospectionQuery,
  getIntrospectionQuery,
  buildClientSchema,
  printSchema,
  buildSchema,
} from 'graphql';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from 'src/utils/firebase';

import {
  selectHeadersValue,
  selectVariablesValue,
  selectInputDataValue,
  selectResponseValue,
  setInputData,
  setHeaders,
  setVariables,
  setResponse,
} from 'src/app/slice/GraphiqlPageSlice';

import Textarea from '../../components/Textarea/Textarea';
import Play from '../../assets/play.svg';
import Docs from '../../assets/docs.svg';
import Settings from '../../assets/settings.svg';
import Modal from '../../components/Modal/Modal';
import SettingModal from '../../components/SettingModal/SettingModal';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

// function buildSchema(source: string | Source): GraphQLSchema {}
// console.log(buildSchema('https://rickandmortyapi.com/graphql'));
function GraphiQLPage(): JSX.Element {
  const sliderRef = useRef<HTMLDivElement>(null);
  const variablesFieldRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useTranslation();
  const [settingsFlag, setSettingsFlag] = useState(false);
  const [fieldFlag, setFieldFlag] = useState(false);
  const [docs, setDocs] = useState(false);
  const [variablesBlock, setVariablesBlock] = useState(true);
  // console.log(buildSchema('rickandmortyapi.com/graphql'));

  const headersValueFromStorage = useAppSelector(selectHeadersValue);
  const variablesValueFromStorage = useAppSelector(selectVariablesValue);
  const inputDataValueFromStorage = useAppSelector(selectInputDataValue);
  const responseValueFromStorage = useAppSelector(selectResponseValue);

  const dispatch = useAppDispatch();

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/authorization');
    }
  });

  const getData = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // ...JSON.parse(headersInput),
        },
        body: JSON.stringify({
          // query: getIntrospectionQuery(),
          query: `${inputDataValueFromStorage}`,
          variables: JSON.parse(variablesValueFromStorage),
        }),
      });
      const data = await response.json();
      const editData = JSON.stringify(data, null, '\t');

      // const x = buildClientSchema(data);

      // const y = printSchema(x);
      // console.log(x);
      dispatch(setResponse(editData));
    } catch (e) {
      dispatch(setResponse(`${e}`));
    }
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
    <div className="graphql basis-1/8 flex-grow-1 flex justify-center dark:bg-base_dark">
      {settingsFlag && (
        <Modal setCloseFlag={setSettingsFlag}>
          <SettingModal />
        </Modal>
      )}
      <div className="relative flex justify-start p-1 docs-nav h-full min-w-[58px] min-h-[80vh] shadow-xl border-[1px] border-base_green_light rounded-r-md mr-1 pt-2 bg-base_white">
        <div className="max-w-[58px] flex flex-col justify-start">
          <button
            className="play rounded-full w-12 h-12 mb-6 hover:scale-105 active:scale-100 cursor-pointer transition ease-in-out delay-75"
            type="button"
            onClick={() => {
              getData();
            }}
          >
            <img src={Play} alt="Play" />
          </button>
          <button
            className="docs rounded-full w-12 h-12 hover:scale-105 active:scale-100 cursor-pointer transition ease-in-out mb-4 delay-75"
            type="button"
            onClick={() => {
              setDocs(!docs);
            }}
          >
            <img src={Docs} alt="Docs" />
          </button>
          <button
            className="setting rounded-full w-12 h-12 hover:scale-105 active:scale-100 cursor-pointer transition ease-in-out delay-75"
            type="button"
            onClick={() => {
              setSettingsFlag(true);
            }}
          >
            <img src={Settings} alt="Settings" />
          </button>
        </div>
        {docs && (
          <div className="absolute rounded-r-md docs text-2xl font-normal text-base_green p-2 docs w-[40vh] top-[-1px] left-[53px] z-10 h-[calc(100%+2px)] bg-base_white border-[1px] border-l-0 border-base_green_light">
            Documents
          </div>
        )}
      </div>
      <div className="request mr-4 w-full flex flex-col min-h-[80vh]">
        <div className="request__wrap h-full shadow-xl border-[1px] border-b-0 relative border-base_green_light rounded-tr-md rounded-tl-md">
          <textarea
            ref={textRef}
            className="w-full h-full query p-4 rounded-tr-md rounded-tl-md bg-base_white outline-0 mb-[-8px] resize-none"
            defaultValue={inputDataValueFromStorage}
            onChange={(e) => {
              dispatch(setInputData(e.target.value));
            }}
          />
        </div>
        <div className="request__inputs h-fit border-[1px] border-base_green_light shadow-xl rounded-br-md rounded-bl-md flex flex-col">
          <div className="relative request__nav flex justify-left pl-4 pr-4  rounded-br-md rounded-bl-md text-sm bg-base_white pb-2">
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
              className="request__nav__item variables w-24 mr-4 hover:text-base_green cursor-pointer text-center"
              onClick={changeRequestInputs}
              type="button"
            >
              {t('GraphQL.Variables')}
            </button>
            <button
              className="request__nav__item w-24 hover:text-base_green cursor-pointer text-center"
              onClick={changeRequestInputs}
              type="button"
            >
              {t('GraphQL.Headers')}
            </button>
            <div
              className="switcher w-24 h-[1px] absolute left-4 bottom-2 bg-base_green_light transition ease-in-out"
              ref={sliderRef}
            />
          </div>
          <div ref={variablesFieldRef}>
            {variablesBlock && !fieldFlag && (
              <Textarea value={variablesValueFromStorage} setVariables={setVariables} />
            )}
            {variablesBlock && fieldFlag && (
              <Textarea value={headersValueFromStorage} setVariables={setHeaders} />
            )}
          </div>
        </div>
      </div>
      <div className="response border-[1px] max-h-[80vh] whitespace-break-spaces border-base_green_light shadow-xl p-4 w-full rounded-md bg-base_white overflow-y-auto">
        {responseValueFromStorage}
      </div>
    </div>
  );
}

export default GraphiQLPage;
