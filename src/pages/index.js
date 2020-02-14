/** @jsx jsx */
import { Link } from "gatsby"
import { jsx } from "theme-ui"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ location }) => (
  <Layout location={location.pathname}>
    <SEO title="Home" />
    <Link to="/archivo">/archivo</Link>
  </Layout>
)

export default IndexPage
