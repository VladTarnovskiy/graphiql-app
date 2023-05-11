interface MyProps {
  value: string;
  setVariables: (value: string) => void;
}

function Textarea(props: MyProps): JSX.Element {
  const { setVariables, value } = props;
  return (
    <textarea
      className="w-full variables h-[221px] p-4 pt-0 rounded-md bg-base_white outline-0"
      defaultValue={value}
      onChange={(e) => {
        setVariables(e.target.value);
      }}
    />
  );
}

export default Textarea;
