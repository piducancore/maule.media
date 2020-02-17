/** @jsx jsx */
import { Styled, jsx } from "theme-ui"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hello from "../components/hello"
import Upload from "../components/uploadz"

const SecondPage = ({ location }) => (
  <Layout location={location.pathname}>
    <SEO title="Page two" />
    <Styled.h1>Hi from the second page</Styled.h1>
    <Hello />
    <Styled.p>Welcome to page 2</Styled.p>
    <Upload />
    <Styled.p>
      <Link to="/">Go back to the homepage</Link>
    </Styled.p>
  </Layout>
)

export default SecondPage
