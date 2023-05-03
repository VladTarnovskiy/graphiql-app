import { useTranslation } from 'react-i18next';
import style from './welcome.module.scss';

function WelcomePage(): JSX.Element {
  const { t } = useTranslation();
  return <div className={style.welcome}>{t('Welcome')}</div>;
}

export default WelcomePage;
