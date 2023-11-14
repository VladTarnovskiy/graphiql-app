import { FC, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  setInputData,
  setHeaders,
  setVariables,
  setHistoryItem,
  selectInputDataValue,
  selectResponseStatus,
} from 'src/app/slice/GraphiqlPageSlice';
import { Documents } from 'src/components/Documents/Documents';
import { HistoryComponent } from 'src/components/Documents/History/index';
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
      className='instruments docs-nav absolute left-0 top-0 z-10 flex h-full min-h-[79vh] min-w-[60px] justify-start rounded-md bg-base_white p-2 pl-[8px] shadow-lg shadow-base_green/50 dark:bg-dark_textarea md:min-w-[50px] md:pl-[7px]'
      data-testid='instruments-component'
    >
      <div className='flex flex-col justify-start'>
        <Tooltip
          id='button-tooltip'
          style={{ fontSize: '1rem', textAlign: 'center' }}
          className='dark:bg-base_white dark:text-base_dark'
        />
        <button
          className='play mb-6 h-11 w-11 cursor-pointer rounded-full bg-base_green_light pl-[7px] transition delay-75 ease-in-out hover:scale-105 active:scale-100 md:h-9 md:w-9 md:pl-[6px]'
          type='button'
          data-tooltip-id='button-tooltip'
          data-tooltip-content={t('GraphQL.NavButtons.Play')!}
          data-tooltip-place='right'
          onClick={() => {
            getData();
            dispatch(setHistoryItem());
          }}
        >
          {responseStatusFromStorage !== 'loading' && (
            <img
              src={instrumentsImages.Play}
              alt='Play'
              className='ml-[1px] w-[30px] md:w-[24px]'
            />
          )}
          {responseStatusFromStorage === 'loading' && (
            <img
              src={instrumentsImages.Stop}
              alt='Stop'
              className='w-[30px] md:w-[24px]'
            />
          )}
        </button>
        <button
          className='docs mb-4 h-11 w-11 cursor-pointer rounded-full transition delay-75 ease-in-out hover:scale-105 hover:opacity-60 active:scale-100 md:h-9 md:w-9'
          type='button'
          data-tooltip-id='button-tooltip'
          data-tooltip-content={t('GraphQL.NavButtons.Documents')!}
          data-tooltip-place='right'
          onClick={() => {
            setDocs(!docs);
            setHistory(false);
          }}
        >
          <img
            src={instrumentsImages.Docs}
            alt='Docs'
          />
        </button>
        <button
          className='history mb-4 ml-[1px] h-10 w-10 cursor-pointer rounded-full transition delay-75 ease-in-out hover:scale-105 hover:opacity-60 active:scale-100 md:h-9 md:w-9'
          type='button'
          data-tooltip-id='button-tooltip'
          data-tooltip-content={t('GraphQL.NavButtons.History')!}
          data-tooltip-place='right'
          onClick={() => {
            setHistory(!history);
            setDocs(false);
          }}
        >
          <img
            src={instrumentsImages.History}
            alt='History'
          />
        </button>
        <button
          className='copy mb-4 ml-[1px] h-10 w-10 cursor-pointer rounded-full transition delay-75 ease-in-out hover:scale-105 hover:opacity-60 active:scale-100 md:h-9 md:w-9'
          type='button'
          data-tooltip-id='button-tooltip'
          data-tooltip-content={t('GraphQL.NavButtons.Copy')!}
          data-tooltip-place='right'
          onClick={() => {
            navigator.clipboard.writeText(inputDataValueFromStorage);
            toast.success(t('GraphQL.Toasts.Copy'));
          }}
        >
          <img
            src={instrumentsImages.Copy}
            alt='Copy'
          />
        </button>
        <button
          className='cleaner mb-4 h-10 w-10 cursor-pointer rounded-full transition delay-75 ease-in-out hover:scale-105 hover:opacity-60 active:scale-100 md:h-9 md:w-9'
          type='button'
          data-tooltip-id='button-tooltip'
          data-tooltip-content={t('GraphQL.NavButtons.Clean')!}
          data-tooltip-place='right'
          onClick={() => {
            dispatch(setInputData(''));
            dispatch(setVariables('{}'));
            dispatch(setHeaders('{}'));
            toast.success(t('GraphQL.Toasts.Clean'));
          }}
        >
          <img
            src={instrumentsImages.Broom}
            alt='Cleaner'
          />
        </button>
      </div>
      <div className='documents'>{docs && <Documents />}</div>
      <div className='history'>
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
