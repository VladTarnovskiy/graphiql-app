import { useAppDispatch } from '../../app/hooks';

interface MyProps {
  value: string;
  setVariables: (value: string) => void;
}

function Textarea(props: MyProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { setVariables, value } = props;
  return (
    <textarea
      className="w-full variables h-[221px] p-4 pt-0 rounded-br-md rounded-bl-md bg-base_white outline-0 resize-none mb-[-8px] xs:text-sm"
      defaultValue={value}
      onChange={(e) => {
        dispatch(setVariables(e.target.value)!);
      }}
    />
  );
}

export default Textarea;
