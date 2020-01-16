/** @jsx jsx */
import { jsx } from "theme-ui"
import moment from "moment"
import { Flex, Box, Heading, Image } from "@theme-ui/components"
import { navigate } from "gatsby"
import localization from "moment/locale/es"

const DayTitle = ({ children, onClick }) => (
  <Heading
    onClick={onClick}
    mb={2}
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
    <Box mt={[4, 4, 5]} mb={[4, 4, 6]}>
      <DayTitle onClick={() => navigate(`/calendario${monthDate}`)}>
        {monthTitle}
      </DayTitle>

      {images.map((image, index) => (
        <Box
          // mr={5}
          key={image.public_id}
          sx={
            {
              // position: "relative",
              // width: ["sm", "md", "lg", "xl"],
            }
          }
        >
          <Image
            sx={{ my: 4 }}
            title={image.image_metadata.CreateDate}
            alt={image.image_metadata.CreateDate}
            src={`https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_CLOUD_NAME}/image/upload/w_960/${image.public_id}.jpg`}
          />
        </Box>
      ))}
    </Box>
  )
}

export default Day
