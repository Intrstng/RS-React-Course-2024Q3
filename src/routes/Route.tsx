import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import { Error404 } from '../components/Error404/Error404';
import { PATH } from '../shared/consts';
import { MainPage } from '../components/MainPage/MainPage';
import { ControlledForm } from '../components/ControlledForm/ControlledForm';
import { UncontrolledFormLive } from '../components/UncontrolledFormLive/UncontrolledFormLive';
import { UncontrolledForm } from '../components/UncontrolledForm/UncontrolledForm';

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
        // element: <UncontrolledFormLive />
      },
      {
        path: PATH.CONTROLLED,
        element: <ControlledForm />
      },
      {
        path: PATH.PAGE_ERROR,
        element: <Error404 />
      }
    ]
  }
]);
