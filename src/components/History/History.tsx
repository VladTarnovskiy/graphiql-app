import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  selectHistory,
  setInputData,
  setHeaders,
  setVariables,
} from 'src/app/slice/GraphiqlPageSlice';

interface MyProps {
  onClose: () => void;
}

function HistoryComponent(props: MyProps): JSX.Element {
  const historyFromStorage = useAppSelector(selectHistory);
  const dispatch = useAppDispatch();
  const { onClose } = props;

  return (
    <div className="history__container flex flex-col border-l-[1px] border-base_green_light pl-2 ml-3 rounded-r-md text-base font-normal text-base_green docs xs:text-sm max-w-[45vh] h-[calc(100%+2px)] overflow-auto">
      <div className="history__title text-2xl pr-8 mb-2">History</div>
      <div className="history__content text-base_dark whitespace-break-spaces dark:text-base_white flex flex-col">
        {historyFromStorage.map((item, index) => {
          return (
            <button
              className="text-left hover:bg-base_grey rounded-sm mb-1 h-8 overflow-hidden"
              type="button"
              key={index.toString()}
              onClick={() => {
                onClose();
                dispatch(setVariables(item.variable));
                dispatch(setInputData(item.inputData));
              }}
            >
              <span className="text-base_green_light">&#8644; </span>
              {JSON.stringify(item.inputData)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HistoryComponent;
