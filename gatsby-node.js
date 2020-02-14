const path = require(`path`)
const moment = require("moment")
const localization = require("moment/locale/es")

moment.updateLocale("es", localization)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allCloudinaryMedia(
        sort: { order: ASC, fields: context___custom___createDate } # filter: { context: { custom: { createDate: { regex: "/^(?!2014)/" } } } }
      ) {
        totalCount
        nodes {
          public_id
          width
          height
          context {
            custom {
              createDate
            }
          }
        }
      }
    }
  `)

  result.data.allCloudinaryMedia.nodes.forEach(({ context }) => {
    const date = moment(context.custom.createDate, "YYYY:MM:DD")
    const day = date.format("YYYY:MM:DD")
    const month = date.format("YYYY:MM")
    const year = date.format("YYYY")
    createPage({
      path: `/archivo/${day.replace(/:/g, "/")}`,
      component: path.resolve(`./src/templates/day.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        day: `/^${day}/`,
      },
    })
    createPage({
      path: `/archivo/${month.replace(/:/g, "/")}`,
      component: path.resolve(`./src/templates/month.js`),
      context: {
        month: `/^${month}/`,
      },
    })
    createPage({
      path: `/archivo/${year.replace(/:/g, "/")}`,
      component: path.resolve(`./src/templates/year.js`),
      context: {
        year: `/^${year}/`,
      },
    })
  })
}
