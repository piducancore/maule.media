import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

const QUERY = gql`
  query {
    hello
  }
`

const Hello = () => {
  const { data } = useQuery(QUERY)
  return <h1>{data && data.hello}</h1>
}

export default Hello
