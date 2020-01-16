const path = require(`path`)
const moment = require("moment")
const localization = require("moment/locale/es")

moment.updateLocale("es", localization)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allCloudinaryMedia(
        sort: { order: ASC, fields: image_metadata___CreateDate } # filter: { image_metadata: { CreateDate: { regex: "/^(?!2014)/" } } }
      ) {
        totalCount
        nodes {
          public_id
          width
          height
          image_metadata {
            CreateDate
          }
        }
      }
    }
  `)
  result.data.allCloudinaryMedia.nodes.forEach(({ image_metadata }) => {
    const date = moment(image_metadata.CreateDate, "YYYY:MM:DD")
    const day = date.format("YYYY:MM:DD")
    const month = date.format("YYYY:MM")
    const year = date.format("YYYY")
    createPage({
      path: `/calendario/${day.replace(/:/g, "/")}`,
      component: path.resolve(`./src/templates/day.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        day: `/^${day}/`,
      },
    })
    createPage({
      path: `/calendario/${month.replace(/:/g, "/")}`,
      component: path.resolve(`./src/templates/month.js`),
      context: {
        month: `/^${month}/`,
      },
    })
    createPage({
      path: `/calendario/${year.replace(/:/g, "/")}`,
      component: path.resolve(`./src/templates/year.js`),
      context: {
        year: `/^${year}/`,
      },
    })
  })
}
