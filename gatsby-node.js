const path = require('path');
const csvToJSON = require('csvtojson');
const _ = require(`lodash`);

async function onCreateNode({
  node,
  actions,
  createNodeId,
  createContentDigest,
}) {
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
  console.log(`@@@@@@object`, getTodayInFileFormat());
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

  createPage({
    path: '/countries',
    component: path.resolve(`./src/templates/countries.js`),
    context: {
      countriesData: globalData,
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
          Provinces_States: [...acc[index].Provinces_States, val],
        };
        return acc;
      }

      const country = {
        Country_Region: val.Country_Region,
        Provinces_States: [
          {
            ...val,
          },
        ],
      };

      return [...acc, country];
    }, []);

  countries.forEach((country) => {
    createPage({
      path: `/countries/${country.Country_Region}`,
      component: path.resolve(`./src/templates/country.js`),
      context: {
        country: { ...country },
      },
    });
  });
}

exports.onCreateNode = onCreateNode;
exports.createPages = createPages;
