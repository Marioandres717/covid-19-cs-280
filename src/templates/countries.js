import React from 'react';
import Layout from '../components/layout';
export default function countries({ pageContext }) {
  const { countriesData } = pageContext;
  return (
    <Layout>
      <pre>{JSON.stringify(countriesData, null, 2)}</pre>
    </Layout>
  );
}
