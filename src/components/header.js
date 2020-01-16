/** @jsx jsx */
import { Styled, jsx } from "theme-ui"
import { Grid, Box, Heading } from "@theme-ui/components"
import { Link } from "gatsby"
import PropTypes from "prop-types"

const Header = ({ siteTitle, isIndex, location }) => {
  const isCalendar = location.lastIndexOf("/calendario", 0) === 0
  return (
    <Styled.div as="header">
      <div
        sx={{
          margin: `0 auto`,
          maxWidth: 960,
          py: 4,
          px: 3,
        }}
      >
        <Grid columns={2}>
          <Box>
            <Heading
              mt={4}
              mb={4}
              sx={{
                margin: 0,
                fontFamily: "heading",
                fontSize: isIndex ? 6 : 4,
                // textAlign: isCalendar ? "center" : "left",
              }}
            >
              <Link
                to="/"
                sx={{
                  textDecoration: `none`,
                }}
              >
                {
                  // isCalendar ? "m.m" : siteTitle
                }
                {siteTitle}
              </Link>
            </Heading>
          </Box>
          <Box>
            <Heading
              mt={4}
              mb={4}
              sx={{
                margin: 0,
                fontFamily: "heading",
                fontSize: isIndex ? 6 : 4,
                textAlign: "right",
              }}
            >
              <Link
                to={isCalendar ? "/calendario" : "/"}
                sx={{
                  textDecoration: `none`,
                }}
              >
                {console.log(location)}
                {isCalendar && "calendario visual"}
              </Link>
            </Heading>
          </Box>
        </Grid>
      </div>
    </Styled.div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
