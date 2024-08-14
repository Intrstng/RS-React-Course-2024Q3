import './App.css';
import { PATH } from './shared/consts/consts';
import { NavLink, Outlet } from 'react-router-dom';

function App() {
  const sum = (a: number, b: number): void => {
    console.log(a + b);
  };
  sum(2, 2);

  return (
    <>
      <nav>
        <NavLink to={PATH.CONTROLLED}>Controlled</NavLink>
        <NavLink to={PATH.UNCONTROLLED}>Uncontrolled</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
