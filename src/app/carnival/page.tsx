import React from 'react';
import DocumentPage from './Carnival';

const CarnivalPage = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <DocumentPage />
    </React.Suspense>
  );
};

export default CarnivalPage;
