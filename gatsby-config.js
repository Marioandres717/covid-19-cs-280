module.exports = {
  siteMetadata: {
    title: `CS 280 - Covid 19 news`,
    description:
      'The most unbias news about the Pandemic. Our purpose is to fight the 2021 Infodemic',
  },
  plugins: [
    {
      resolve: `gatsby-source-git`,
      options: {
        name: 'hopkins',
        remote: 'https://github.com/CSSEGISandData/COVID-19.git',
        branch: 'master',
        patterns: [
          `csse_covid_19_data/csse_covid_19_time_series/*.csv`,
          `csse_covid_19_data/csse_covid_19_daily_reports/*.csv`,
          // `csse_covid_19_data/csse_covid_19_daily_reports_us/*.csv`,
        ],
        local: `${__dirname}/hopkins/`,
      },
    },
  ],
};
