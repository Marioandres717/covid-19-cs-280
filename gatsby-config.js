module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-git`,
      options: {
        name: 'hopkins',
        remote: 'https://github.com/CSSEGISandData/COVID-19.git',
        branch: 'master',
        patterns: `csse_covid_19_data/csse_covid_19_time_series/*.csv`,
        local: `${__dirname}/hopkins/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/hopkins/csse_covid_19_data/csse_covid_19_time_series/`,
      },
    },
    `gatsby-transformer-csv`,
  ],
};
