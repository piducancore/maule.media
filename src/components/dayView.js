/** @jsx jsx */
import { jsx } from "theme-ui"
import moment from "moment"
import { Box, Flex, IconButton, Heading, Image } from "@theme-ui/components"
import { Link } from "gatsby"
import localization from "moment/locale/es"

const Day = ({ day, images }) => {
  moment.updateLocale("es", localization)
  const date = moment(day, "/YYYY/MM/DD")
  const monthDate = date.format("/YYYY/MM")
  const monthTitle = date.format("dddd DD MMMM YYYY")
  return (
    <Box>
      <Flex my={2}>
        <Box>
          <Link
            to={`/calendario${monthDate}`}
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
      {images.map((image, index) => (
        <Image
          my={2}
          key={image.public_id}
          title={image.image_metadata.CreateDate}
          alt={image.image_metadata.CreateDate}
          src={`https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_CLOUD_NAME}/image/upload/w_960/${image.public_id}.jpg`}
        />
      ))}
    </Box>
  )
}

export default Day
