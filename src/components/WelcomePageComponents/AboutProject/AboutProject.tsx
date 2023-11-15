import { t } from 'i18next';
import { FC } from 'react';

export const AboutProject: FC = () => {
  return (
    <div
      className='graphqlInfo flex flex-col items-center justify-center gap-2 pl-4 pr-4 text-center text-xl text-teal-500'
      data-testid='aboutProject-component'
    >
      <img
        src='https://marmelab.com/images/blog/graphql/logo.png'
        className='max-w-[320px] rounded-md shadow-xl dark:bg-dark_black sm:max-w-[180px] xs:max-w-[140px]'
        alt=''
      />
      <div className='text-center text-2xl text-teal-500 sm:text-sm'>
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
