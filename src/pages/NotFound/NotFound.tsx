import style from './notFound.module.scss';

function NotFound(): JSX.Element {
  return (
    <div className={style.error_wrapper}>
      <div className={style.error_coder}>404</div>
      <div className={style.error_description}>The page you are looking for not found!</div>
      <div className={style.error_animation} />
    </div>
  );
}

export default NotFound;
