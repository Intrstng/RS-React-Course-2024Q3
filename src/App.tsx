import './App.css';
import { NavLink, Outlet } from 'react-router-dom';
import { PATH } from './shared/consts';

function App() {
  return (
    <>
      <nav>
        <NavLink to={PATH.UNCONTROLLED}>Uncontrolled</NavLink>
        <NavLink to={PATH.CONTROLLED}>Controlled</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
