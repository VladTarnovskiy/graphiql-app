import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import DeveloperCard from '../../components/WelcomeCards/DeveloperCard';

function WelcomePage(): JSX.Element {
  const { t } = useTranslation();
  const [fieldFlag, setFieldFlag] = useState('project');

  const changeRequestInputs = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.target as HTMLElement;
    setFieldFlag(el.className.split(' ')[0]);
  };

  return (
    <div className="graphql flex justify-center">
      <div className="flex flex-col shadow-lg shadow-base_green/50 p-4 w-[65vw] sm:w-[95vw] md:w-[80vw] min-h-[80vh] rounded-md bg-base_white dark:bg-dark_black">
        <div className="mr-4 w-full flex flex-col dark:text-base_white">
          <div className="relative graphql__nav sm:justify-center flex justify-left pl-4 pr-4 xs:pl-1 xs:pr-1 mb-4 text-sm bg-base_white dark:bg-dark_black pb-2">
            {(fieldFlag === 'project' && (
              <button
                className="project underline underline-offset-4 decoration-base_green w-16 mr-4 xs:mr-2 hover:text-base_green cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                {t(`Welcome.Buttons.Project`)}
              </button>
            )) || (
              <button
                className="project w-16 mr-4 xs:mr-2 hover:text-base_green_light cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                {t(`Welcome.Buttons.Project`)}
              </button>
            )}
            {(fieldFlag === 'developers' && (
              <button
                className="developers underline underline-offset-4 decoration-base_green w-24 mr-4 xs:mr-2 hover:text-base_green_light cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                {t(`Welcome.Buttons.Developers`)}
              </button>
            )) || (
              <button
                className="developers w-24 mr-4 xs:mr-2 hover:text-base_green_light cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                {t(`Welcome.Buttons.Developers`)}
              </button>
            )}
            {(fieldFlag === 'course' && (
              <button
                className="course w-16 underline underline-offset-4 decoration-base_green hover:text-base_green cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                {t(`Welcome.Buttons.Course`)}
              </button>
            )) || (
              <button
                className="course w-16 hover:text-base_green cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                {t(`Welcome.Buttons.Course`)}
              </button>
            )}
          </div>
        </div>
        {fieldFlag === 'project' && (
          <div className="graphqlInfo text-teal-500 pl-4 pr-4 flex flex-col gap-2 justify-center items-center text-center text-xl">
            <img
              src="https://marmelab.com/images/blog/graphql/logo.png"
              className="max-w-[320px] sm:max-w-[180px] xs:max-w-[140px] shadow-xl rounded-md dark:bg-dark_black"
              alt=""
            />
            <div className="text-teal-500 text-center text-2xl sm:text-sm">
              {t(`Welcome.GraphiQLAbout.1`)}
              <br />
              {t(`Welcome.GraphiQLAbout.2`)}
              <br />
              {t(`Welcome.GraphiQLAbout.3`)}
              <br />
              {t(`Welcome.GraphiQLAbout.4`)}
              <br />
              {t(`Welcome.GraphiQLAbout.5`)}
              <br />
              {t(`Welcome.GraphiQLAbout.6`)}
              <br />
              {t(`Welcome.GraphiQLAbout.7`)}
              <ul>
                <li>{t(`Welcome.GraphiQLAbout.Apollo`)}</li>
                <li>{t(`Welcome.GraphiQLAbout.Offfix`)}</li>
                <li>{t(`Welcome.GraphiQLAbout.Graphback`)}</li>
                <li>{t(`Welcome.GraphiQLAbout.OpenAPI-to-GraphQL`)}</li>
              </ul>
            </div>
          </div>
        )}
        {fieldFlag === 'developers' && (
          <section className="developersSection text-teal-500 pl-4 pr-4 flex flex-col justify-center items-center text-center text-2xl sm:text-xl">
            <h1 className="text-4xl sm:text-2xl mb-4">{t(`Welcome.DevelopersAbout.Team`)}</h1>
            <div className="developersCards text-teal-500 grid gap-4 grid-cols-3 grid-rows-1 lg:grid-cols-1 lg:grid-rows-3 text-center text-2xl sm:text-sm">
              {['Vlad', 'Aleksei', 'Denis'].map((dev) => (
                <DeveloperCard developer={dev} key={dev} />
              ))}
            </div>
          </section>
        )}
        {fieldFlag === 'course' && (
          <div className="rsschoolInfo text-teal-500 pl-4 pr-4 flex flex-col gap-2 justify-center items-center text-center text-xl  sm:text-sm">
            <img
              src="https://rs.school/images/partners/logo-rs.svg"
              className="max-w-[280px] lg:max-w-[180px] md:max-w-[140px] xs:max-w-[100px] pr-6 xs:pr-3 shadow-xl rounded-md"
              alt="RSSchool logo"
            />
            <div>
              {t(`Welcome.RSSAbout.1`)}
              <br />
              {t(`Welcome.RSSAbout.2`)}
              <br />
              {t(`Welcome.RSSAbout.3`)}
              <br />
              {t(`Welcome.RSSAbout.4`)}
              <ul>
                <li>{t(`Welcome.RSSAbout.Advantages1`)}</li>
                <li>{t(`Welcome.RSSAbout.Advantages2`)}</li>
                <li>{t(`Welcome.RSSAbout.Advantages3`)}</li>
                <li>{t(`Welcome.RSSAbout.Advantages4`)}</li>
                <li>{t(`Welcome.RSSAbout.Advantages5`)}</li>
                <li>{t(`Welcome.RSSAbout.Advantages6`)}</li>
                <li>{t(`Welcome.RSSAbout.Advantages7`)}</li>
                <li>{t(`Welcome.RSSAbout.Advantages8`)}</li>
                <li>{t(`Welcome.RSSAbout.Advantages9`)}</li>
                <li>{t(`Welcome.RSSAbout.Advantages10`)}</li>
                <li>{t(`Welcome.RSSAbout.Advantages11`)}</li>
                <li>{t(`Welcome.RSSAbout.Advantages12`)}</li>
                <li>{t(`Welcome.RSSAbout.Advantages13`)}</li>
                <li>{t(`Welcome.RSSAbout.Advantages14`)}</li>
                <li>{t(`Welcome.RSSAbout.Advantages15`)}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WelcomePage;
