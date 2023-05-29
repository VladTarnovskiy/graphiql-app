import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import {
  setInputData,
  setHeaders,
  setVariables,
  setHistoryItem,
  selectInputDataValue,
  selectResponseStatus,
} from 'src/app/slice/GraphiqlPageSlice';
import { Documents } from 'src/components/Documents/Documents';
import { HistoryComponent } from 'src/components/Documents/History/History';
import { Tooltip } from 'react-tooltip';
import { useTranslation } from 'react-i18next';
import { instrumentsImages } from 'src/assets/instrumentIcons';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';

interface InstrumentsProps {
  getData: () => void;
}

export const Instruments: FC<InstrumentsProps> = ({ getData }) => {
  const { t } = useTranslation();
  const [docs, setDocs] = useState(false);
  const [history, setHistory] = useState(false);
  const inputDataValueFromStorage = useAppSelector(selectInputDataValue);
  const responseStatusFromStorage = useAppSelector(selectResponseStatus);
  const dispatch = useAppDispatch();

  return (
    <div
      className="absolute left-0 top-0 instruments z-10 flex justify-start p-2 pl-[8px] md:pl-[7px] docs-nav h-full dark:bg-dark_textarea min-w-[60px] md:min-w-[50px] min-h-[79vh] shadow-lg shadow-base_green/50 rounded-md bg-base_white"
      data-testid="instruments-component"
    >
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
            <img src={instrumentsImages.Play} alt="Play" className="w-[30px] md:w-[24px]" />
          )}
          {responseStatusFromStorage === 'loading' && (
            <img src={instrumentsImages.Stop} alt="Stop" className="w-[30px] md:w-[24px]" />
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
          <img src={instrumentsImages.Docs} alt="Docs" />
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
          <img src={instrumentsImages.History} alt="History" />
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
          <img src={instrumentsImages.Copy} alt="Copy" />
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
          <img src={instrumentsImages.Broom} alt="Cleaner" />
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
  );
};
