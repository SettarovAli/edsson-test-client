import { FC, lazy } from 'react';

import ROUTES from './routes';

const Documents = lazy(() => import('../pages/documents/Documents'));
const PageNotFound = lazy(() => import('../pages/page-not-found/PageNotFound'));

interface Route {
  path: ROUTES.DOCUMENTS_PAGE | ROUTES.PAGE_NOT_FOUND;
  element: FC;
}

const publicRoutes: Route[] = [
  { path: ROUTES.DOCUMENTS_PAGE, element: Documents },
  { path: ROUTES.PAGE_NOT_FOUND, element: PageNotFound },
];

export default publicRoutes;
