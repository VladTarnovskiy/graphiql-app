import { t } from 'i18next';
import { FC } from 'react';
import { DeveloperCard } from 'src/components/WelcomePageComponents/DeveloperCards/DeveloperCard';

export const AboutDevelopers: FC = () => {
  return (
    <section
      className='developersSection flex flex-col items-center justify-center pl-4 pr-4 text-center text-2xl text-teal-500 sm:text-xl'
      data-testid='aboutDevelopers-component'
    >
      <h1 className='mb-4 text-4xl sm:text-2xl'>{t(`Welcome.DevelopersAbout.Team`)}</h1>
      <div className='developersCards grid grid-cols-3 grid-rows-1 gap-4 text-center text-2xl text-teal-500 sm:text-sm lg:grid-cols-1 lg:grid-rows-3'>
        {['Vlad', 'Aleksei', 'Denis'].map((dev) => (
          <DeveloperCard
            developer={dev}
            key={dev}
          />
        ))}
      </div>
    </section>
  );
};
