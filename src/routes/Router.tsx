import { Suspense, FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import publicRoutes from './publicRoutes';
import Spinner from '../components/spinner/Spinner';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense fallback={<Spinner />}>
                <route.element />
              </Suspense>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
