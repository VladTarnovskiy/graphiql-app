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
      <div className="response border-[1px] border-base_green_light shadow-xl p-4 w-[65vw] min-h-[80vh] rounded-md bg-base_white">
        <div className="request mr-4 w-full flex flex-col">
          <div className="relative request__nav flex justify-left pl-4 pr-4 mb-4 text-sm bg-base_white pb-2">
            {(fieldFlag === 'project' && (
              <button
                className="project underline underline-offset-4 decoration-base_green w-16 mr-4 hover:text-base_green cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                {t(`Welcome.Buttons.Project`)}
              </button>
            )) || (
              <button
                className="project w-16 mr-4 hover:text-base_green cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                {t(`Welcome.Buttons.Project`)}
              </button>
            )}
            {(fieldFlag === 'developers' && (
              <button
                className="developers underline underline-offset-4 decoration-base_green w-24 mr-4 hover:text-base_green cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                {t(`Welcome.Buttons.Developers`)}
              </button>
            )) || (
              <button
                className="developers w-24 mr-4 hover:text-base_green cursor-pointer"
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
          <div className="RSSchoolInfo text-teal-500 pl-4 pr-4 flex flex-col justify-center items-center text-center text-xl">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNZXcF6GSCd-jCOOT-GFYFhHuUHWf-pYgATGEiqDxzkAQF-Lec65LBsDn-FwYSwmAH-4M&usqp=CAU"
              className="border-[1px] max-w-[350px] sm:max-w-[200px] border-base_green_light shadow-xl rounded-md"
              alt=""
            />
            <div className="text-teal-500 text-center text-2xl">
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
          <section className="developersSection text-teal-500 h-4/5 pl-4 pr-4 flex flex-col justify-center items-center text-center text-2xl sm:text-xl">
            <h1 className="text-4xl sm:text-2xl mb-4">{t(`Welcome.DevelopersAbout.Team`)}</h1>
            <div className="developersCards text-teal-500 grid gap-4 grid-cols-3 grid-rows-1 lg:grid-cols-1 lg:grid-rows-3 text-center text-2xl">
              {['Vlad', 'Aleksei', 'Denis'].map((dev) => (
                <DeveloperCard developer={dev} key={dev} />
              ))}
            </div>
          </section>
        )}
        {fieldFlag === 'course' && (
          <div className="RSSchoolInfo text-teal-500 pl-4 pr-4 flex flex-col justify-center items-center text-center text-xl">
            <img
              src="https://rs.school/images/partners/logo-rs.svg"
              className="border-[1px] max-w-[300px] sm:max-w-[200px] border-base_green_light pr-6 shadow-xl rounded-md"
              alt=""
            />
            <div>
              {t(`Welcome.RSSAbout.1`)}
              <br />
              {t(`Welcome.RSSAbout.2`)}
              <br />
              {t(`Welcome.RSSAbout.3`)}
              <br />
              {t(`Welcome.RSSAbout.4`)}
              <ul className="text-base">
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
