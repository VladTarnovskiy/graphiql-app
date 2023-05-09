import { Suspense, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Textarea from '../../components/Textarea/Textarea';
import Play from '../../assets/play.svg';
import Docs from '../../assets/docs.svg';
import Settings from '../../assets/settings.svg';
import Modal from '../../components/Modal/Modal';
import SettingModal from '../../components/SettingModal/SettingModal';

function GraphiQLPage(): JSX.Element {
  const sliderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useTranslation();
  const [settingsFlag, setSettingsFlag] = useState(false);
  const [fieldFlag, setFieldFlag] = useState(false);
  const [variables, setVariables] = useState('{variables}');
  const [headersInput, setHeadersInputs] = useState('{headers}');
  const [inputData, setInputData] = useState('');
  const [responseData, setResponseData] = useState('');
  const [docs, setDocs] = useState(false);

  const getData = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          headersInput,
        },
        body: JSON.stringify({
          query: `${inputData}`,
          variables: `${variables}`,
        }),
      });
      const res = await response.json();
      // const res = await JSON.stringify(resx, null, 't');

      setResponseData(res);
      console.log(res);
      console.log(headersInput);
      console.log(variables);
    } catch (e) {
      setResponseData(`${e}`);
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
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              docs ? setDocs(false) : setDocs(true);
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
        <div className="request__wrap shadow-xl border-[1px] relative mb-1 basis-4/6 border-base_green_light rounded-md">
          <textarea
            ref={textRef}
            className="w-full h-full query p-4 rounded-md bg-base_white outline-0"
            defaultValue="query"
            onChange={(e) => {
              setInputData(e.target.value);
            }}
          />
        </div>
        <div className="request__inputs border-[1px] border-base_green_light shadow-xl basis-2/6 rounded-md flex flex-col">
          <div className="relative request__nav flex justify-left pl-4 pr-4 text-sm rounded-md bg-base_white pb-2">
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
          {!fieldFlag && <Textarea value={variables} setVariables={setVariables} />}
          {fieldFlag && <Textarea value={headersInput} setVariables={setHeadersInputs} />}
        </div>
      </div>

      <Suspense fallback={<div>Load</div>}>
        <div className="response border-[1px] border-base_green_light shadow-xl p-4 w-full rounded-md bg-base_white">
          {JSON.stringify(responseData)}
        </div>
      </Suspense>
    </div>
  );
}

export default GraphiQLPage;
