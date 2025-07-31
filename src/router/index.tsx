import { createBrowserRouter } from 'react-router-dom';

import SessionLayout from '../components/SessionLayout/index.tsx';
import { ROUTES } from '../constants/index.ts';
import Home from '../pages/Home/index.tsx';
import Login from '../pages/Login/index.tsx';
import NotFoundPage from '../pages/NotFoundPage/index.tsx';
import AuthenticatedLayout from './AuthenticatedLayout.tsx';
import PublicLayout from './PublicLayout.tsx';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <SessionLayout />,
    children: [
      // Public routes
      {
        path: ROUTES.LOGIN,
        element: <PublicLayout />,
        children: [
          {
            path: ROUTES.LOGIN,
            element: <Login />,
          },
        ],
      },

      // Auth Protected routes
      {
        path: ROUTES.HOME,
        element: <AuthenticatedLayout />,
        children: [
          {
            path: ROUTES.HOME,
            element: <Home />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
