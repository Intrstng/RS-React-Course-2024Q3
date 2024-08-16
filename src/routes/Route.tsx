import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import { Error404 } from '../components/Error404/Error404';
import { Controlled } from '../components/Controlled/Controlled';
import { Form } from '../components/Form/Form';
import { PATH } from '../shared/consts';
import { UncontrolledForm } from '../components/UncontrolledForm/UncontrolledForm';
import { MainPage } from '../components/MainPage/MainPage';

export const router = createBrowserRouter([
  {
    path: PATH.PAGE_ROOT,
    element: <App />,
    errorElement: <Navigate to={PATH.PAGE_ERROR} />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: PATH.UNCONTROLLED,
        element: <UncontrolledForm />
        // element: <Form />
      },
      {
        path: PATH.CONTROLLED,
        element: <Controlled />
      },
      {
        path: PATH.PAGE_ERROR,
        element: <Error404 />
      }
    ]
  }
]);
