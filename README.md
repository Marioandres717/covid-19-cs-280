<p align="center">
  <a href="https://cs-280-covid-19.netlify.app/" alt="application link">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  CS-280-Covid-19
</h1>

## 🚀 Quick start

**Live site preview**

[Link to application live preview](https://cs-280-covid-19.netlify.app/)

1. **Clone Github Repository.**

   Use git to download the repository

   ```shell
   # clone repository
   git clone https://github.com/Marioandres717/covid-19-cs-280.git
   ```

2. **Add Netlify-CLI**

   To install Netlify CLI, make sure you have Node.js version 10 or later, then run this command from any directory in your terminal

   ```shell
   npm install netlify-cli -g
   ```

3. **Install Project Dependencies.**

   Navigate into your new site’s directory and install dependencies

   ```shell
   cd covid-19-cs-280/
   npm install
   ```

4. **Add the News API Key**
   This Application uses the [News API](https://newsapi.org/)
   ```shell
   # in the root folder run
   touch .env
   ```
   Add API key to file
   ```shell
   NEWS_API=<YOUR KEY>
   ```
5. **Start Project**
   ```shell
     netlify dev
   ```
6. **Open the code and start customizing!**

   Your site is now running at http://localhost:8888

7. **Links**

   - [Netlify CLI](https://docs.netlify.com/cli/get-started/)
   - [News API](https://newsapi.org/)
