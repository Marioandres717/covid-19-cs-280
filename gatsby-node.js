const path = require('path');
const csvToJSON = require('csvtojson');
const _ = require(`lodash`);
const fetch = require('node-fetch');

async function onCreateNode({
  node,
  actions,
  createNodeId,
  createContentDigest,
}) {
  function transformObject(obj, id, type) {
    const csvNode = {
      ...obj,
      id,
      children: [],
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(obj),
        type,
      },
    };
    createNode(csvNode);
    createParentChildLink({ parent: node, child: csvNode });
  }

  const { createNode, createParentChildLink } = actions;

  if (node.internal.mediaType !== `text/csv`) {
    return;
  }

  if (
    !/^time_series_covid19/.test(node.name) &&
    node.name !== getTodayInFileFormat()
  ) {
    return;
  }
  const parsedContent = await csvToJSON().fromFile(node.absolutePath);
  const filename = parseInt(node.name) ? 'today' : node.name;
  parsedContent.forEach((obj, i) => {
    transformObject(
      obj,
      obj.id ? obj.id : createNodeId(`${node.id} [${i}] >>> CSV`),
      _.upperFirst(_.camelCase(`${filename} Csv`))
    );
  });
}

async function createPages({ graphql, actions: { createPage } }) {
  const summation = (acc, val) =>
    parseInt(acc ? acc : 0) + parseInt(val ? val : 0);
  const countTotalGlobal = (nodes) =>
    nodes.reduce(
      (acc, node) => ({
        globalActive: summation(acc.globalActive, node.Active),
        globalConfirmed: summation(acc.globalConfirmed, node.Confirmed),
        globalDeaths: summation(acc.globalDeaths, node.Deaths),
        globalRecoveries: summation(acc.globalRecoveries, node.Recovered),
      }),
      {
        globalActive: 0,
        globalConfirmed: 0,
        globalDeaths: 0,
        globalRecoveries: 0,
      }
    );

  const { data } = await graphql(`
    query AllData {
      todayGlobal: allTodayCsv {
        nodes {
          id
          Country_Region
          Province_State
          Combined_Key
          Active
          Confirmed
          Deaths
          Recovered
        }
      }
    }
  `);

  const { nodes: globalData } = data.todayGlobal;

  const {
    globalActive,
    globalConfirmed,
    globalDeaths,
    globalRecoveries,
  } = countTotalGlobal(globalData);

  createPage({
    path: '/',
    component: path.resolve(`./src/templates/home.js`),
    context: {
      active: globalActive,
      confirmed: globalConfirmed,
      deaths: globalDeaths,
      recoveries: globalRecoveries,
    },
  });

  const countries = globalData
    .reduce((acc, val) => {
      const index = acc.findIndex(
        (ele) =>
          ele.Country_Region === val.Country_Region &&
          ele.Province_State === val.Province_State
      );
      if (index >= 0) {
        acc[index] = {
          ...acc[index],
          Active: summation(acc[index].Active, val.Active),
          Confirmed: summation(acc[index].Confirmed, val.Confirmed),
          Deaths: summation(acc[index].Deaths, val.Deaths),
          Recovered: summation(acc[index].Recovered, val.Recovered),
        };
        return acc;
      }
      return [...acc, val];
    }, [])
    .reduce((acc, val) => {
      const index = acc.findIndex(
        (ele) => ele.Country_Region === val.Country_Region
      );
      if (index >= 0) {
        acc[index] = {
          ...acc[index],
          totalActive: summation(acc[index].totalActive, val.Active),
          totalConfirmed: summation(acc[index].totalConfirmed, val.Confirmed),
          totalRecoveries: summation(acc[index].totalRecovered, val.Recovered),
          totalDeaths: summation(acc[index].totalDeaths, val.Deaths),
          Provinces_States: [...acc[index].Provinces_States, val],
        };
        return acc;
      }

      const country = {
        Country_Region: val.Country_Region,
        totalActive: val.Active ? parseInt(val.Active) : 0,
        totalConfirmed: val.Confirmed ? parseInt(val.Confirmed) : 0,
        totalRecoveries: val.Recovered ? parseInt(val.Recovered) : 0,
        totalDeaths: val.Deaths ? parseInt(val.Deaths) : 0,
        Provinces_States: [
          {
            ...val,
          },
        ],
      };

      return [...acc, country];
    }, []);

  createPage({
    path: '/countries',
    component: path.resolve(`./src/templates/countries.js`),
    context: {
      countriesData: countries.map((country) => ({
        Country_region: country.Country_Region,
        active: country.totalActive,
        confirmed: country.totalConfirmed,
        deaths: country.totalDeaths,
        recovered: country.totalRecoveries,
      })),
    },
  });

  countries.forEach((country) => {
    createPage({
      path: `/countries/${country.Country_Region}`,
      component: path.resolve(`./src/templates/country.js`),
      context: {
        country: { ...country },
      },
    });
  });

  const [month, day, year] = getTodayInFileFormat().split('-');
  const url = `https://newsapi.org/v2/everything?q=covid19&from=${year}-${month}-${day}&sortBy=popularity&apiKey=${process.env.NEWS_API}`;
  const req = await fetch(url);
  const news = await req.json();

  createPage({
    path: '/news',
    component: path.resolve(`./src/templates/news.js`),
    context: {
      news,
    },
  });
}

exports.onCreateNode = onCreateNode;
exports.createPages = createPages;

function dataDate(date = new Date()) {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  const msLocal = date.getTime() - offsetMs;
  const dateLocal = new Date(msLocal);
  dateLocal.setDate(dateLocal.getDate() - 1);
  return dateLocal;
}

function getTodayInFileFormat() {
  const [today] = dataDate().toISOString().split('T');
  const [year, month, day] = today.split('-');
  return `${month}-${day}-${year}`;
}
