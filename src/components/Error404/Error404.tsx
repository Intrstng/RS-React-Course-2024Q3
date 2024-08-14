import errorNotFound from '../../assets/error_404.png';
import S from './Error404.module.css';
import { NavLink, useRouteError } from 'react-router-dom';
import { PATH } from '../../shared/consts/consts';

export const Error404 = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <>
      <img className={S.error} src={errorNotFound} alt={'error not found'} />
      <NavLink to={PATH.PAGE_ROOT} className={S.homeButton}>
        Home
      </NavLink>
    </>
  );
};
