import React from 'react';
import Layout from '../components/layout';

export default function country({ pageContext }) {
  const { country } = pageContext;
  return (
    <Layout>
      <pre>{JSON.stringify(country, null, 2)}</pre>;
    </Layout>
  );
}
