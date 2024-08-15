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
