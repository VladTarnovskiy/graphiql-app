import { t } from 'i18next';
import { DeveloperCard } from 'src/components/WelcomePageComponents/DeveloperCards/DeveloperCard';

export const AboutDevelopers = () => {
  return (
    <section
      className="developersSection text-teal-500 pl-4 pr-4 flex flex-col justify-center items-center text-center text-2xl sm:text-xl"
      data-testid="aboutDevelopers-component"
    >
      <h1 className="text-4xl sm:text-2xl mb-4">{t(`Welcome.DevelopersAbout.Team`)}</h1>
      <div className="developersCards text-teal-500 grid gap-4 grid-cols-3 grid-rows-1 lg:grid-cols-1 lg:grid-rows-3 text-center text-2xl sm:text-sm">
        {['Vlad', 'Aleksei', 'Denis'].map((dev) => (
          <DeveloperCard developer={dev} key={dev} />
        ))}
      </div>
    </section>
  );
};
