import React from 'react';

export default function country({ pageContext }) {
  const { country } = pageContext;
  return <div>{country}</div>;
}
