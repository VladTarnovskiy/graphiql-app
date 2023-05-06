import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Textarea from '../../components/Textarea/Textarea';
import Play from '../../assets/play.svg';
import Docs from '../../assets/docs.svg';
import Settings from '../../assets/settings.svg';
import Modal from '../../components/Modal/Modal';
import SettingModal from '../../components/SettingModal/SettingModal';

function GraphiQLPage(): JSX.Element {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [settingsFlag, setSettingsFlag] = useState(false);
  const [fieldFlag, setFieldFlag] = useState(false);
  const [variables, setVariables] = useState('{variables}');
  const [headers, setHeaders] = useState('{headers}');

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
    <div className="graphql basis-1/8 flex justify-center dark:bg-base_dark">
      {settingsFlag && (
        <Modal setCloseFlag={setSettingsFlag}>
          <SettingModal />
        </Modal>
      )}
      <div className="flex flex-col justify-start p-1 docs-nav h-full min-w-[58px] min-h-[80vh] shadow-xl border-[1px] border-base_green_light rounded-r-md mr-1 pt-2 bg-base_white">
        <button
          className="play rounded-full w-12 h-12 mb-6 hover:scale-105 active:scale-100 cursor-pointer transition ease-in-out delay-75"
          type="button"
        >
          <img src={Play} alt="Play" />
        </button>
        <button
          className="docs rounded-full w-12 h-12 hover:scale-105 active:scale-100 cursor-pointer transition ease-in-out mb-4 delay-75"
          type="button"
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
      <div className="request mr-4 w-full flex flex-col min-h-[80vh]">
        <div className="request__wrap shadow-xl border-[1px] relative mb-4 basis-4/6 border-base_green_light rounded-md">
          <textarea
            className="w-full h-full query p-4 rounded-md bg-base_white outline-0"
            defaultValue="query"
          />
        </div>
        <div className="request__inputs border-[1px] border-base_green_light shadow-xl basis-2/6 rounded-md flex flex-col">
          <div className="relative request__nav flex justify-left pl-4 pr-4 text-sm bg-base_white pb-2">
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
          {fieldFlag && <Textarea value={headers} setVariables={setHeaders} />}
        </div>
      </div>
      <div className="response border-[1px] border-base_green_light shadow-xl p-4 w-full rounded-md bg-base_white">
        data...
      </div>
    </div>
  );
}

export default GraphiQLPage;
