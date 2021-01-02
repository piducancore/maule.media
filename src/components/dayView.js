/** @jsx jsx */
import { jsx } from "theme-ui"
import { Fragment } from "react"
import { Box, Flex, Heading, Image } from "@theme-ui/components"
import { Link } from "gatsby"
import dayjs from "dayjs"
// import locale from "dayjs/locale/es" // load on demand
// import { useRef } from "react"
import { useInView } from "react-intersection-observer"
dayjs.locale("es") // use Spanish locale globally

const Day = ({ day, images }) => {
  const [ref, inView] = useInView({
    /* Optional options */
    // threshold: 1,
    rootMargin: "-46px",
  })
  const date = dayjs(day, "/YYYY/MM/DD")
  const monthDate = date.format("/YYYY/MM")
  return (
    <Fragment>
      <Flex my={2} ref={ref}>
        <Box>
          <Link
            to={`/archivo${monthDate}`}
            sx={{
              textDecoration: `none`,
              color: "secondary",
            }}
          >
            <Heading>{date.format("MMMM YYYY")}</Heading>
          </Link>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Heading
            sx={{
              textAlign: "right",
            }}
          >
            {date.format("dddd DD")}
          </Heading>
        </Box>
      </Flex>
      {!inView && (
        <Flex
          py={3}
          pr={[4, 4, 0]}
          mx="auto"
          bg="background"
          sx={{
            position: "fixed",
            width: "100%",
            maxWidth: 960,
            top: 0,
          }}
        >
          <Box>
            <Link
              to={`/archivo${monthDate}`}
              sx={{
                textDecoration: `none`,
                color: "secondary",
              }}
            >
              <Heading>{date.format("MMMM YYYY")}</Heading>
            </Link>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Heading
              sx={{
                textAlign: "right",
              }}
            >
              {date.format("dddd DD")}
            </Heading>
          </Box>
        </Flex>
      )}
      {images.map((image, index) => (
        <Image
          my={2}
          key={image.public_id}
          title={image.context.custom.createDate}
          alt={image.context.custom.createDate}
          src={`https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_CLOUD_NAME}/image/upload/w_960/${image.public_id}.jpg`}
        />
      ))}
    </Fragment>
  )
}

export default Day
