import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import { Error404 } from '../components/Error404/Error404';
import { Uncontrolled } from '../components/Uncontrolled/Uncontrolled';
import { Controlled } from '../components/Controlled/Controlled';
import { PATH } from '../shared/consts/consts';
import { Form } from '../components/Form/Form';

export const router = createBrowserRouter([
  {
    path: PATH.PAGE_ROOT,
    element: <App />,
    errorElement: <Navigate to={PATH.PAGE_ERROR} />,
    children: [
      {
        path: PATH.UNCONTROLLED,
        // element: <Uncontrolled />
        element: <Form />
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
