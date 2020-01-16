import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import moment from "moment"
import localization from "moment/locale/es"

import MonthView from "../components/monthView"

const Year = ({ path, data }) => {
  moment.updateLocale("es", localization)
  const { nodes } = data.allCloudinaryMedia
  let months = []
  for (let i = 1; i < 13; i++) {
    const currentMonth = moment(
      path.replace(/\/calendario\//g, "/"),
      "/YYYY/MM"
    ).add(i > 1 ? i - 1 : 0, "month")
    months.push(
      <MonthView
        key={currentMonth}
        month={currentMonth.format("/YYYY/MM")}
        images={nodes}
      />
    )
  }
  return (
    <Layout location={path}>
      {// use this conditional to start 2019 from october.
        // to render every month use months array as is.
        path === "/calendario/2019" ? months.slice(9) : months}
    </Layout>
  )
}

export default Year

export const query = graphql`
  query($year: String!) {
    allCloudinaryMedia(
      sort: { order: ASC, fields: image_metadata___CreateDate }
      filter: { image_metadata: { CreateDate: { regex: $year } } }
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
`
