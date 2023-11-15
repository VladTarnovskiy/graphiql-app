import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { selectTheme } from 'src/app/slice/SettingsSlice';
import { myDarkTheme, myLightTheme } from 'src/utils/codemirror-set';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { FC } from 'react';

interface TextareaProps {
  value: string;
  setVariables: (value: string) => void;
}

export const Textarea: FC<TextareaProps> = ({ setVariables, value }) => {
  const dispatch = useAppDispatch();
  const themeFromStore = useAppSelector(selectTheme);

  return (
    <div
      className='variables h-[221px] w-full resize-none overflow-auto rounded-bl-md rounded-br-md bg-base_white outline-0 dark:bg-dark_textarea dark:text-base_white xs:text-sm'
      data-testid='textarea-element'
    >
      <CodeMirror
        value={value}
        className='my-code-mirror'
        extensions={[javascript({ jsx: true })]}
        theme={themeFromStore === 'light' ? myLightTheme : myDarkTheme}
        basicSetup={{
          lineNumbers: false,
        }}
        onChange={(e) => {
          dispatch(setVariables(e)!);
        }}
      />
    </div>
  );
};
