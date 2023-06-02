import { useTranslation } from 'react-i18next';

export const DeveloperCard = ({ developer }: { developer: string }) => {
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
      className=' rounded-md p-2 shadow-lg shadow-base_green/50'
    >
      <div className='flex max-w-[300px] flex-col items-center sm:max-w-[200px]'>
        <img
          src={developerInfo[0].logoLink}
          className='max-w-[150px] rounded-md shadow-xl sm:max-w-[130px]'
          alt=''
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
};
