import { useTranslation } from 'react-i18next';

function WelcomePage(): JSX.Element {
  const { t } = useTranslation();
  return <div className="text-teal-500 text-center text-2xl">{t('Welcome')}</div>;
}

export default WelcomePage;
