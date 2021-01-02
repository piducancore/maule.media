const path = require(`path`)
const dayjs = require("dayjs")
const customParseFormat = require("dayjs/plugin/customParseFormat")
dayjs.locale("es") // use Spanish locale globally
dayjs.extend(customParseFormat)

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

  result.data.allCloudinaryMedia.nodes
    .reduce((unique, o) => {
      if (
        !unique.some(
          obj =>
            obj.context.custom.createDate.split(" ")[0] ===
            o.context.custom.createDate.split(" ")[0]
        )
      ) {
        unique.push(o)
      }
      return unique
    }, [])
    .forEach(({ context }) => {
      const date = dayjs(context.custom.createDate.split(" ")[0], "YYYY:MM:DD")
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
