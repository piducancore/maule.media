require("dotenv").config()
module.exports = {
  siteMetadata: {
    title: `maule.media`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-plugin-theme-ui",
    `gatsby-theme-style-guide`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#f3eeed`,
        theme_color: `#f3eeed`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `@piducancore/gatsby-source-cloudinary-metadata`,
      options: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // required
        api_key: process.env.CLOUDINARY_API_KEY, // required
        api_secret: process.env.CLOUDINARY_API_SECRET, // required
        type: `upload`, // required
        max_results: 500, // default: 10
        prefix: `estallidoTalca/`, // optional
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
