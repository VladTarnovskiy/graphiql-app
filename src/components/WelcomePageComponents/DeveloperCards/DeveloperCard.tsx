import { useTranslation } from 'react-i18next';

export function DeveloperCard({ developer }: { developer: string }): JSX.Element {
  const { t } = useTranslation();
  const developersInfo = [
    {
      name: 'Vlad',
      logoLink: 'https://avatars.githubusercontent.com/u/93903876?v=4',
      githubLink: 'https://github.com/VladTarnovskiy',
    },
    {
      name: 'Aleksei',
      logoLink: 'https://avatars.githubusercontent.com/u/88935233?v=4',
      githubLink: 'https://github.com/AlexGorSer',
    },
    {
      name: 'Denis',
      logoLink: 'https://avatars.githubusercontent.com/u/106694274?v=4',
      githubLink: 'https://github.com/DenisKa13051992',
    },
  ];
  const developerInfo = developersInfo.filter((dev) => dev.name.includes(developer));

  return (
    <a
      href={developerInfo[0].githubLink}
      className=" shadow-lg shadow-base_green/50 rounded-md p-2"
    >
      <div className="max-w-[300px] sm:max-w-[200px] flex flex-col items-center">
        <img
          src={developerInfo[0].logoLink}
          className="max-w-[150px] sm:max-w-[130px] shadow-xl rounded-md"
          alt=""
        />
        <div>
          {t(`Welcome.DevelopersAbout.${developerInfo[0].name}`)}
          <br />
          {t(`Welcome.DevelopersAbout.Front-end`)}
          <br />
          {developer === 'Vlad' && t(`Welcome.DevelopersAbout.Leader`)}
        </div>
      </div>
    </a>
  );
}
