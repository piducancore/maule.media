import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import MonthView from "../components/monthView"

const Month = ({ path, data }) => {
  const { nodes } = data.allCloudinaryMedia
  return (
    <Layout location={path}>
      <MonthView
        month={path.replace(/\/calendario\//g, "/")}
        images={nodes}
        single={true}
      />
    </Layout>
  )
}

export default Month

export const query = graphql`
  query($month: String!) {
    allCloudinaryMedia(
      sort: { order: ASC, fields: image_metadata___CreateDate }
      filter: { image_metadata: { CreateDate: { regex: $month } } }
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
