import { NavLink } from 'react-router-dom';
import style from './navigation.module.scss';

function Navigation(): JSX.Element {
  return (
    <div className="navigation font-thin">
      <NavLink className={style.navigation__item} to="/">
        Welcome
      </NavLink>
      <NavLink className={style.navigation__item} to="/graphi-ql">
        GraphiQL
      </NavLink>
    </div>
  );
}

export default Navigation;
