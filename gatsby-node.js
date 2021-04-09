exports.createPages = async ({ graphql, actions }) => {
  const dateOfDataRetrival = formatStringToGraphqlFormat();
  return graphql(`
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
   recovered: allTimeSeriesCovid19RecoveredGlobalCsv {
    nodes {
      Country_Region
      Province_State
      ${dateOfDataRetrival}
    }
  }
  }`).then(({ data }) => {
    const confirmedCases = data.confirmed.nodes
      .reduce(uniqueCountryAndState, [])
      .map((country) => parseInt(country[dateOfDataRetrival]))
      .reduce(summation, 0);

    console.table(['Confirmed', confirmedCases]);

    const deathCount = data.deathCount.nodes
      .reduce(uniqueCountryAndState, [])
      .map((country) => parseInt(country[dateOfDataRetrival]))
      .reduce(summation, 0);

    console.table([`deathCount`, deathCount]);

    const recoveredCount = data.recovered.nodes
      .reduce(uniqueCountryAndState, [])
      .map((country) => parseInt(country[dateOfDataRetrival]))
      .reduce(summation, 0);

    console.table([`deathCount`, recoveredCount]);

    return { confirmedCases, deathCount, recoveredCount };
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
