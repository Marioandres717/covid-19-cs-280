import React from 'react';

export default function countries({ pageContext }) {
  const { countriesData } = pageContext;
  return <pre>{JSON.stringify(countriesData, null, 2)}</pre>;
}
