import { useTranslation } from 'react-i18next';
import { useState } from 'react';

function WelcomePage(): JSX.Element {
  const { t } = useTranslation();
  const [fieldFlag, setFieldFlag] = useState('project');

  const changeRequestInputs = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.target as HTMLElement;
    el.classList.contains('project')
      ? setFieldFlag('project')
      : el.classList.contains('developers')
      ? setFieldFlag('developers')
      : setFieldFlag('course');
  };

  return (
    <div className="graphql flex justify-center">
      <div className="response border-[1px] border-base_green_light shadow-xl p-4 w-[80vw] rounded-md bg-base_white">
        <div className="request mr-4 w-full flex flex-col">
          <div className="relative request__nav flex justify-left pl-4 pr-4 mb-4 text-sm bg-base_white pb-2">
            {(fieldFlag === 'project' && (
              <button
                className="request__nav__item project underline underline-offset-4 decoration-base_green w-16 mr-4 hover:text-base_green cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                Project
              </button>
            )) || (
              <button
                className="request__nav__item project w-16 mr-4 hover:text-base_green cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                Project
              </button>
            )}
            {(fieldFlag === 'developers' && (
              <button
                className="request__nav__item developers underline underline-offset-4 decoration-base_green w-24 mr-4 hover:text-base_green cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                Developers
              </button>
            )) || (
              <button
                className="request__nav__item developers w-24 mr-4 hover:text-base_green cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                Developers
              </button>
            )}
            {(fieldFlag === 'course' && (
              <button
                className="request__nav__item w-16 underline underline-offset-4 decoration-base_green course hover:text-base_green cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                Course
              </button>
            )) || (
              <button
                className="request__nav__item w-16 course hover:text-base_green cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                Course
              </button>
            )}
          </div>
        </div>
        {fieldFlag === 'project' && (
          <div className="RSSchoolInfo text-teal-500 flex flex-col justify-center items-center text-center text-xl">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNZXcF6GSCd-jCOOT-GFYFhHuUHWf-pYgATGEiqDxzkAQF-Lec65LBsDn-FwYSwmAH-4M&usqp=CAU"
              className="border-[1px] max-w-[300px] border-base_green_light shadow-xl rounded-md"
              alt=""
            />
            <div className="text-teal-500 text-center text-2xl">
              {t(`GraphiQL is a playground/IDE for graphQL requests.`)}
              <br />
              {t(
                `GraphQL is a query language for your API, and a server-side runtime for executing queries using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.`
              )}
            </div>
          </div>
        )}
        {fieldFlag === 'developers' && (
          <section className="developersSection text-teal-500 flex flex-col justify-center items-center text-center text-2xl">
            <h1 className="text-3xl mb-4">Our team</h1>
            <div className="developersCards text-teal-500 flex flex-row justify-center text-center text-2xl">
              <div className="vladCard max-w-[300px] flex flex-col items-center">
                <img
                  src="https://avatars.githubusercontent.com/u/93903876?v=4"
                  className="border-[1px] border-base_green_light max-w-[200px] shadow-xl rounded-md"
                  alt=""
                />
                <div>
                  {t(`Vlad Tarnovskiy`)}
                  <br />
                  {t(`Front-end developer`)}
                </div>
              </div>
              <div className="alexCard max-w-[300px] ml-4 mr-4 flex flex-col items-center">
                <img
                  src="https://avatars.githubusercontent.com/u/88935233?v=4"
                  className="border-[1px] border-base_green_light max-w-[200px] shadow-xl rounded-md"
                  alt=""
                />
                <div>
                  {t(`Aleksei Gromov`)} <br />
                  {t(`Front-end developer`)}
                </div>
              </div>
              <div className="denisCard max-w-[300px] flex flex-col items-center">
                <img
                  src="https://avatars.githubusercontent.com/u/106694274?v=4"
                  className="border-[1px] border-base_green_light max-w-[200px] shadow-xl rounded-md"
                  alt=""
                />
                <div>
                  {t(`Denis Karnachenko`)}
                  <br />
                  {t(`Front-end developer`)}
                </div>
              </div>
            </div>
          </section>
        )}
        {fieldFlag === 'course' && (
          <div className="RSSchoolInfo text-teal-500 flex flex-col justify-center items-center text-center text-xl">
            <img
              src="https://rs.school/images/partners/logo-rs.svg"
              className="border-[1px] max-w-[200px] border-base_green_light pr-6 shadow-xl rounded-md"
              alt=""
            />
            <div>
              {t(`RS School is free-of-charge and community-based education program conducted by The Rolling Scopes developer community
since 2013.`)}
              <br />

              {t(`Everyone can study at RS School, regardless of age, professional employment, or place of residence.

The mentors and trainers of our school are front-end and javascript developers from different companies and countries.`)}
              <br />

              {t(
                `The RS School is working by the principle of "Pay it forward." Members of our community share their knowledge and check students' tasks for free. And we hope our students will continue this work as our mentors in the future.`
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WelcomePage;
