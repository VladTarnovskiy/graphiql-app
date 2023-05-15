interface MyProps {
  value: string;
  setVariables: (value: string) => void;
}

function Textarea(props: MyProps): JSX.Element {
  const { setVariables, value } = props;
  return (
    <textarea
      className="w-full variables flex-grow-1 h-full p-4 pt-0 rounded-md bg-base_white outline-0 dark:bg-dark_textarea dark:text-base_white"
      defaultValue={value}
      onChange={(e) => {
        setVariables(e.target.value);
      }}
    />
  );
}

export default Textarea;
