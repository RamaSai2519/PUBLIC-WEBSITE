import React from 'react';
import DocumentPage from './Partner';

const PartnerPage = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <DocumentPage />
    </React.Suspense>
  );
};

export default PartnerPage;
