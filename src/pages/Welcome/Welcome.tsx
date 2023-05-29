import { useState } from 'react';
import {
  AboutCourse,
  AboutDevelopers,
  AboutProject,
  InfoNavigation,
} from 'src/components/WelcomePageComponents/index';

const WelcomePage = () => {
  const [fieldFlag, setFieldFlag] = useState('project');

  const changeRequestInputs = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.target as HTMLElement;
    setFieldFlag(el.className.split(' ')[0]);
  };

  return (
    <div className="graphql flex justify-center">
      <div className="flex flex-col shadow-lg shadow-base_green/50 p-4 w-[65vw] sm:w-[95vw] md:w-[80vw] min-h-[79vh] rounded-md bg-base_white dark:bg-dark_black">
        <div className="mr-4 w-full flex flex-col dark:text-base_white">
          <div className="relative graphql__nav sm:justify-center flex justify-left pl-4 pr-4 xs:pl-1 xs:pr-1 mb-4 text-sm bg-base_white dark:bg-dark_black pb-2">
            <InfoNavigation changeRequestInputs={changeRequestInputs} fieldFlag={fieldFlag} />
          </div>
        </div>
        {fieldFlag === 'project' && <AboutProject />}
        {fieldFlag === 'developers' && <AboutDevelopers />}
        {fieldFlag === 'course' && <AboutCourse />}
      </div>
    </div>
  );
};

export default WelcomePage;
