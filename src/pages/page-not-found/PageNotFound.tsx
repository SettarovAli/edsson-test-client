import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

const PageNotFound: FC = () => {
  return (
    <Helmet>
      <title>Page Not Found</title>
      <meta name="description" content="Page Not Found" />
    </Helmet>
  );
};

export default PageNotFound;
