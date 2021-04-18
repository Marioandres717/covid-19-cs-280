import React from 'react';

export default function country({ pageContext }) {
  const { country } = pageContext;
  return <pre>{JSON.stringify(country, null, 2)}</pre>;
}
