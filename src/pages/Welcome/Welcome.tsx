import { useState, MouseEvent } from 'react';
import {
  AboutCourse,
  AboutDevelopers,
  AboutProject,
  InfoNavigation,
} from 'src/components/WelcomePageComponents';

export default function WelcomePage() {
  const [fieldFlag, setFieldFlag] = useState('project');

  const changeRequestInputs = (e: MouseEvent<HTMLButtonElement>) => {
    const el = e.target as HTMLElement;
    setFieldFlag(el.className.split(' ')[0]);
  };

  return (
    <div className='graphql flex justify-center'>
      <div className='flex min-h-[79vh] w-[65vw] flex-col rounded-md bg-base_white p-4 shadow-lg shadow-base_green/50 dark:bg-dark_black sm:w-[95vw] md:w-[80vw]'>
        <div className='mr-4 flex w-full flex-col dark:text-base_white'>
          <div className='graphql__nav justify-left relative mb-4 flex bg-base_white pb-2 pl-4 pr-4 text-sm dark:bg-dark_black sm:justify-center xs:pl-1 xs:pr-1'>
            <InfoNavigation
              changeRequestInputs={changeRequestInputs}
              fieldFlag={fieldFlag}
            />
          </div>
        </div>
        {fieldFlag === 'project' && <AboutProject />}
        {fieldFlag === 'developers' && <AboutDevelopers />}
        {fieldFlag === 'course' && <AboutCourse />}
      </div>
    </div>
  );
}
