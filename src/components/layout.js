/** @jsx jsx */
import { Styled, jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import "normalize.css"

import Header from "./header"

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isIndex = location === rootPath
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Styled.root sx={{ backgroundColor: "background", color: "text" }}>
      <Header
        siteTitle={data.site.siteMetadata.title}
        isIndex={isIndex}
        location={location}
      />
      <div
        sx={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: 3,
          paddingTop: 0,
          display: "flex",
          minHeight: "calc(100vh - 124px)",
          flexDirection: "column",
        }}
      >
        <main
          sx={{
            flex: 1,
          }}
        >
          {children}
        </main>
        <footer>
          <Styled.h5 sx={{ textAlign: "center" }}>
            <Link
              to="/"
              sx={{
                textDecoration: `none`,
                color: "secondary",
              }}
            >
              maule.media
            </Link>
            , talca {new Date().getFullYear()}.
          </Styled.h5>
        </footer>
      </div>
    </Styled.root>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
