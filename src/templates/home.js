import React from 'react';

export default function Home({ pageContext }) {
  console.log(`data`, pageContext);
  const { active, confirmed, deaths, recoveries } = pageContext;
  return (
    <div>
      <h1>Tracking Coronavirus</h1>
      <h5>Computer Science 280 - University of Regina</h5>

      <div
        style={{
          display: 'flex',
          flexDirection: '`row`',
          justifyContent: 'space-around',
        }}
      >
        <span>Active: {active}</span>
        <span>Confirmed: {confirmed}</span>
        <span>Recoveries: {recoveries}</span>
        <span>Deaths: {deaths}</span>
      </div>
    </div>
  );
}
