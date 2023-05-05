interface MyProps {
  text: string;
}

function Button(prop: MyProps): JSX.Element {
  const { text } = prop;

  return (
    <div className="button h-[40px] w-[100px] m-2 pt-1 bg-teal-400 rounded text-center text-gray-700 hover:shadow-md hover:shadow-yellow-300/60 hover:cursor-pointer active:scale-[95%] transition ease-in-out delay-75">
      {text}
    </div>
  );
}

export default Button;
