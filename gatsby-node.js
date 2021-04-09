const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const dateOfDataRetrival = formatStringToGraphqlFormat();
  const { data } = await graphql(`
  query AllData {
    confirmed: allTimeSeriesCovid19ConfirmedGlobalCsv {
      nodes {
        Country_Region
        Province_State
        ${dateOfDataRetrival}
      }
    }
    deathCount: allTimeSeriesCovid19DeathsGlobalCsv {
     nodes {
      Country_Region
      Province_State
      ${dateOfDataRetrival}
     }
   }
   recoveries: allTimeSeriesCovid19RecoveredGlobalCsv {
    nodes {
      Country_Region
      Province_State
      ${dateOfDataRetrival}
    }
  }
  }`);

  const confirmData = data.confirmed.nodes.reduce(uniqueCountryAndState, []);
  const deathsData = data.deathCount.nodes.reduce(uniqueCountryAndState, []);
  const recoveriesData = data.recoveries.nodes.reduce(
    uniqueCountryAndState,
    []
  );

  const countriesTotalConfirmedCases = countCountryTotal(confirmData);
  const countriesTotalDeaths = countCountryTotal(deathsData);
  const countriesTotalRecoveries = countCountryTotal(recoveriesData);
  const countriesData = countriesTotalConfirmedCases.map((country) => ({
    name: country.name,
    confirmed: country.totalCases,
    deaths: countriesTotalDeaths.find(({ name }) => name === country.name)
      .totalCases,
    recoveries: countriesTotalRecoveries.find(
      ({ name }) => name === country.name
    ).totalCases,
  }));

  createPage({
    path: '/countries',
    component: path.resolve(`./src/templates/countries.js`),
    context: {
      countriesData: countriesData,
    },
  });

  const confirmedCases = countTotal(confirmData);
  const deathCount = countTotal(deathsData);
  const recoveredCount = countTotal(recoveriesData);

  createPage({
    path: '/',
    component: path.resolve(`./src/templates/home.js`),
    context: {
      confirmed: confirmedCases,
      deaths: deathCount,
      recoveries: recoveredCount,
    },
  });
};

function dataDate(date) {
  date.setDate(date.getDate() - 1);
  return date;
}

function formatStringToGraphqlFormat(date = new Date()) {
  const [weekday, month, day, year] = dataDate(date).toDateString().split(' ');

  const formatMonth = (month) => {
    switch (month) {
      case 'Jan':
        return `_1`;
      case 'Feb':
        return `_2`;
      case 'Mar':
        return `_3`;
      case 'Apr':
        return `_4`;
      case 'May':
        return `_5`;
      case 'Jun':
        return `_6`;
      case 'Jul':
        return `_7`;
      case 'Aug':
        return `_8`;
      case 'Sep':
        return `_9`;
      case 'Oct':
        return `_10`;
      case 'Nov':
        return `_11`;
      case 'Dec':
        return `_12`;
      default:
        return;
    }
  };

  return `${formatMonth(month)}_${day.replace('0', '')}_${year.substring(2)}`;
}

const summation = (acc, val) => acc + val;

const uniqueCountryAndState = (acc, val) => {
  if (
    acc.findIndex(
      (ele) =>
        ele.Country_Region === val.Country_Region &&
        ele.Province_State === val.Province_State
    ) >= 0
  ) {
    return acc;
  } else {
    return [...acc, val];
  }
};

const countCountryTotal = (nodes) =>
  nodes
    .map(({ Country_Region, ...rest }) => ({
      name: Country_Region,
      totalCases: rest[formatStringToGraphqlFormat()],
    }))
    .reduce((acc, country) => {
      const index = acc.findIndex(({ name }) => name === country.name);
      if (index >= 0) {
        acc[index] = {
          ...acc[index],
          totalCases: acc[index].totalCases + parseInt(country.totalCases),
        };
        return acc;
      }

      return [
        ...acc,
        {
          name: country.name,
          totalCases: parseInt(country.totalCases),
        },
      ];
    }, []);

const countTotal = (nodes) =>
  nodes
    .map((country) => parseInt(country[formatStringToGraphqlFormat()]))
    .reduce(summation, 0);
