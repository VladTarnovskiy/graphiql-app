import { useTranslation } from 'react-i18next';

function DeveloperCard({ developer }: { developer: string }): JSX.Element {
  const { t } = useTranslation();
  const developersInfo = [
    {
      name: 'Vlad Tarnovskiy',
      logoLink: 'https://avatars.githubusercontent.com/u/93903876?v=4',
    },
    {
      name: 'Aleksei Gromov',
      logoLink: 'https://avatars.githubusercontent.com/u/88935233?v=4',
    },
    {
      name: 'Denis Karnachenko',
      logoLink: 'https://avatars.githubusercontent.com/u/106694274?v=4',
    },
  ];
  const developerInfo = developersInfo.filter((dev) => dev.name.includes(developer));

  return (
    <div className="max-w-[300px] sm:max-w-[200px] flex flex-col items-center">
      <img
        src={developerInfo[0].logoLink}
        className="border-[1px] border-base_green_light max-w-[200px] sm:max-w-[150px] shadow-xl rounded-md"
        alt=""
      />
      <div>
        {t(`${developerInfo[0].name}`)}
        <br />
        {t(`Front-end developer`)}
      </div>
    </div>
  );
}

export default DeveloperCard;
