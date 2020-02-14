import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import DayView from "../components/dayView"

const Day = ({ path, data }) => {
  const { nodes } = data.allCloudinaryMedia
  return (
    <Layout location={path}>
      <DayView day={path.replace(/\/archivo\//g, "/")} images={nodes} />
    </Layout>
  )
}

export default Day

export const query = graphql`
  query($day: String!) {
    allCloudinaryMedia(
      sort: { order: ASC, fields: context___custom___createDate }
      filter: { context: { custom: { createDate: { regex: $day } } } }
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
`
