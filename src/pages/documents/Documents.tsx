import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import DocumentsLayout from '../../components/documents-layout/DocumentsLayout';

const Documents: FC = () => {
  return (
    <>
      <Helmet>
        <title>Documents</title>
        <meta name="description" content="Documents" />
      </Helmet>
      <div className="container">
        <DocumentsLayout />
      </div>
    </>
  );
};

export default Documents;
