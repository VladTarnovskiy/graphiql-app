import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  selectHistory,
  setInputData,
  setHeaders,
  setVariables,
} from 'src/app/slice/GraphiqlPageSlice';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';

interface HistoryComponentProps {
  onClose: () => void;
}

export const HistoryComponent: FC<HistoryComponentProps> = ({ onClose }) => {
  const historyFromStorage = useAppSelector(selectHistory);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <div className='history__container docs ml-3 flex h-[calc(100%+2px)] max-w-[45vh] flex-col overflow-auto rounded-r-md border-l-[1px] border-base_green_light pl-2 text-base font-normal text-base_green xs:text-sm'>
      <div className='history__title mb-2 pr-8 text-2xl'>{t('GraphQL.History')}</div>
      <div className='history__content flex flex-col whitespace-break-spaces text-base_dark dark:text-base_white'>
        {historyFromStorage.map(({ variable, inputData, header }, index) => {
          return (
            <button
              className='mb-1 h-8 overflow-hidden rounded-sm text-left hover:bg-base_grey sm:h-6'
              type='button'
              key={index.toString()}
              onClick={() => {
                onClose();
                dispatch(setVariables(variable));
                dispatch(setInputData(inputData));
                dispatch(setHeaders(header));
              }}
            >
              <span className='text-base_green_light'>&#8644; </span>
              {JSON.stringify(inputData)}
            </button>
          );
        })}
      </div>
    </div>
  );
};
