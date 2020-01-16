/** @jsx jsx */
import { jsx } from "theme-ui"
import moment from "moment"
import { Box, Heading, Image } from "@theme-ui/components"
import { navigate } from "gatsby"
import localization from "moment/locale/es"

const DayTitle = ({ children, onClick }) => (
  <Heading
    onClick={onClick}
    sx={{
      textAlign: "center",
    }}
  >
    {children}
  </Heading>
)

const Day = ({ day, images }) => {
  moment.updateLocale("es", localization)
  const date = moment(day, "/YYYY/MM/DD")
  const monthDate = date.format("/YYYY/MM")
  const monthTitle = date.format("dddd DD MMMM YYYY")
  return (
    <Box>
      <DayTitle onClick={() => navigate(`/calendario${monthDate}`)}>
        {monthTitle}
      </DayTitle>

      {images.map((image, index) => (
        <Image
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
