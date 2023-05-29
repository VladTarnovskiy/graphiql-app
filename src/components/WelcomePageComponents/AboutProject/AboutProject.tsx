import { t } from 'i18next';

export const AboutProject = () => {
  return (
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
  );
};
