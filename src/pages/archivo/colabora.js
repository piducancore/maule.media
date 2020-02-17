/** @jsx jsx */
import { Styled, jsx } from "theme-ui"
import { Link } from "gatsby"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Upload from "../../components/uploadz"

const QUERY = gql`
  query {
    hello
  }
`

const ColaboraPage = ({ location }) => {
  const { data } = useQuery(QUERY)
  return (
    <Layout location={location.pathname}>
      <SEO title="¿Te gustaría colaborar?" />
      <Styled.h1>¿Te gustaría colaborar?</Styled.h1>
      <Styled.p>Welcome to page 2</Styled.p>
      {!data && (
        <a href={`${process.env.GATSBY_SERVER_URL}/auth/logout`}>LOGEATE</a>
      )}
      {data && <Upload />}
      <Styled.p>
        <Link to="/">Go back to the homepage</Link>
      </Styled.p>
    </Layout>
  )
}

export default ColaboraPage
