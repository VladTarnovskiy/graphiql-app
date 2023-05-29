import { t } from 'i18next';
import style from './notFound.module.scss';

export default function NotFound() {
  return (
    <div className={`${style.error_wrapper} dark:text-base_white`}>
      <div className={style.error_code}>404</div>
      <div className={style.error_description}>{t(`404`)}</div>
      <div className={style.error_animation} />
    </div>
  );
}
