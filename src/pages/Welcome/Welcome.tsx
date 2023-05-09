import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import DeveloperCard from './DeveloperCard';

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
                Project
              </button>
            )) || (
              <button
                className="project w-16 mr-4 hover:text-base_green cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                Project
              </button>
            )}
            {(fieldFlag === 'developers' && (
              <button
                className="developers underline underline-offset-4 decoration-base_green w-24 mr-4 hover:text-base_green cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                Developers
              </button>
            )) || (
              <button
                className="developers w-24 mr-4 hover:text-base_green cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                Developers
              </button>
            )}
            {(fieldFlag === 'course' && (
              <button
                className="course w-16 underline underline-offset-4 decoration-base_green hover:text-base_green cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                Course
              </button>
            )) || (
              <button
                className="course w-16 hover:text-base_green cursor-pointer"
                onClick={changeRequestInputs}
                type="button"
              >
                Course
              </button>
            )}
          </div>
        </div>
        {fieldFlag === 'project' && (
          <div className="RSSchoolInfo text-teal-500 pl-4 pr-4 flex flex-col justify-center items-center text-center text-xl">
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
              <br />
              {t(
                `GraphQL queries always return predictable results. Apps using GraphQL are fast and stable because they control the data they get, not the server`
              )}
              <br />
              {t(
                `GraphQL queries access not just the properties of one resource but also smoothly follow references between them. While typical REST APIs require loading from multiple URLs, GraphQL APIs get all the data your app needs in a single request. Apps using GraphQL can be quick even on slow mobile network connections`
              )}
              <br />
              {t(
                `GraphQL APIs are organized in terms of types and fields, not endpoints. Access the full capabilities of your data from a single endpoint. GraphQL uses types to ensure Apps only ask for what’s possible and provide clear and helpful errors. Apps can use types to avoid writing manual parsing code.`
              )}
            </div>
          </div>
        )}
        {fieldFlag === 'developers' && (
          <section className="developersSection text-teal-500 pl-4 pr-4 flex flex-col justify-center items-center text-center text-2xl sm:text-xl">
            <h1 className="text-4xl sm:text-2xl mb-4">Our team</h1>
            <div className="developersCards text-teal-500 grid gap-4 grid-cols-3 grid-rows-1 lg:grid-cols-1 grid-rows-3 text-center text-2xl">
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
