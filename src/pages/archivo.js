/** @jsx jsx */
import { Styled, jsx } from "theme-ui"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ArchivoPage = ({ location }) => (
  <Layout location={location.pathname}>
    <SEO title="archivo fotográfico" />
    <Styled.p>
      Lorem ipsum dolor sit amet consectetur adipiscing elit venenatis
      facilisis, ultrices ad diam torquent scelerisque a lacinia suspendisse
      nec, auctor hendrerit posuere magna hac laoreet orci parturient. Tempor
      sociis euismod quisque montes iaculis vitae nisi eu arcu sagittis velit
      cursus, vivamus est tincidunt tortor in volutpat augue eget magnis primis{" "}
      <Link
        to="/archivo/2019/10"
        sx={{
          textDecoration: `none`,
          color: "secondary",
        }}
      >
        octubre 2019
      </Link>
      .
    </Styled.p>
    .
  </Layout>
)

export default ArchivoPage
