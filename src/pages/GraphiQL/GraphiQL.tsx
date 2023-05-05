import { useRef, useState } from 'react';
import Textarea from '../../components/Textarea/Textarea';

function GraphiQLPage(): JSX.Element {
  const sliderRef = useRef<HTMLDivElement>(null);
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
      sliderRef.current!.style.transform = 'translateX(125%)';
    }
  };

  return (
    <div className="graphql w-full flex justify-center">
      <div className="request mr-4 w-full flex flex-col min-h-[80vh]">
        <textarea
          className="query shadow-xl border-[1px] border-base_green_light p-4 basis-4/6 mb-4 rounded-md bg-base_white outline-0"
          defaultValue="query"
        />
        <div className="request__inputs border-[1px] border-base_green_light shadow-xl basis-2/6 rounded-md flex flex-col">
          <div className="relative request__nav flex justify-left pl-4 pr-4 text-sm bg-base_white pb-2">
            <button
              className="request__nav__item variables w-16 mr-4 hover:text-base_green cursor-pointer"
              onClick={changeRequestInputs}
              type="button"
            >
              Variables
            </button>
            <button
              className="request__nav__item w-16 hover:text-base_green cursor-pointer"
              onClick={changeRequestInputs}
              type="button"
            >
              Headers
            </button>
            <div
              className="switcher w-16 h-[1px] absolute left-4 bottom-2 bg-base_green_light transition ease-in-out"
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
