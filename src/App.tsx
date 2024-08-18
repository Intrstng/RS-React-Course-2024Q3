import './App.css';
import { NavLink, Outlet } from 'react-router-dom';
import { PATH } from './shared/consts';

function App() {
  return (
    <>
      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : 'navLink')}
          to={PATH.UNCONTROLLED}
        >
          Uncontrolled
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : 'navLink')}
          to={PATH.CONTROLLED}
        >
          Controlled
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
