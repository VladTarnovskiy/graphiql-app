import { t } from 'i18next';

export const AboutCourse = () => {
  return (
    <div
      className="rsschoolInfo text-teal-500 pl-4 pr-4 flex flex-col gap-2 justify-center items-center text-center text-xl  sm:text-sm"
      data-testid="aboutCourse-component"
    >
      <img
        src="https://rs.school/images/partners/logo-rs.svg"
        className="max-w-[280px] lg:max-w-[180px] md:max-w-[140px] xs:max-w-[100px] pr-6 xs:pr-3 shadow-xl rounded-md"
        alt="RSSchool logo"
      />
      <div>
        {t(`Welcome.RSSAbout.1`)}
        <br />
        {t(`Welcome.RSSAbout.2`)}
        <br />
        {t(`Welcome.RSSAbout.3`)}
        <br />
        {t(`Welcome.RSSAbout.4`)}
        <ul>
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
  );
};
