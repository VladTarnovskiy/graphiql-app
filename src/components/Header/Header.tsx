import { useLocation } from 'react-router-dom';
import style from './header.module.scss';

function Header(): JSX.Element {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Welcome';
      case '/graphi-ql':
        return 'Graphi QL';
      case '/authorization':
        return 'Authorization';
      default:
        return 'Not Found';
    }
  };

  return <h1 className={style.page__title}>{getPageTitle()}</h1>;
}

export default Header;
