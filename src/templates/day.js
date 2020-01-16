import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import DayView from "../components/dayView"

const Day = ({ path, data }) => {
  const { nodes } = data.allCloudinaryMedia
  return (
    <Layout location={path}>
      <DayView day={path.replace(/\/calendario\//g, "/")} images={nodes} />
    </Layout>
  )
}

export default Day

export const query = graphql`
  query($day: String!) {
    allCloudinaryMedia(
      sort: { order: ASC, fields: image_metadata___CreateDate }
      filter: { image_metadata: { CreateDate: { regex: $day } } }
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
