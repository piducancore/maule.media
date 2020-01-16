/** @jsx jsx */
import { jsx } from "theme-ui"
import { Box, Grid, Heading, Flex, IconButton } from "@theme-ui/components"
import { navigate } from "gatsby"
import moment from "moment"
import localization from "moment/locale/es"

const MonthTitle = ({ children, single }) => {
  moment.updateLocale("es", localization)
  const nextMonth = moment(children, "MMMM YYYY").add(1, "month")
  const nextMonthLink = nextMonth.format("/YYYY/MM")
  const prevMonth = moment(children, "MMMM YYYY").subtract(1, "month")
  const prevMonthLink = prevMonth.format("/YYYY/MM")

  return (
    <Flex mt={2} mb={2}>
      {single ? (
        <Box>
          <IconButton
            aria-label="mes anterior"
            onClick={() => navigate(`/calendario${prevMonthLink}`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9.591"
              height="17.061"
              viewBox="0 0 9.591 17.061"
            >
              <path
                id="prev_arrow"
                d="M5041,1180l8,8-8,8"
                transform="translate(5050.061 1196.53) rotate(180)"
                fill="none"
                stroke="#707070"
                strokeWidth="1"
              />
            </svg>
          </IconButton>
        </Box>
      ) : null}
      <Box sx={{ flex: 1, margin: "auto" }}>
        <Heading sx={{ textAlign: "center" }}>{children}</Heading>
      </Box>
      {single ? (
        <Box>
          <IconButton
            aria-label="mes siguiente"
            onClick={() => navigate(`/calendario${nextMonthLink}`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9.591"
              height="17.061"
              viewBox="0 0 9.591 17.061"
            >
              <path
                id="next_arrow"
                d="M5041,1180l8,8-8,8"
                transform="translate(-5040.47 -1179.47)"
                fill="none"
                stroke="#707070"
                strokeWidth="1"
              />
            </svg>
          </IconButton>
        </Box>
      ) : null}
    </Flex>
  )
}

const MonthGrid = ({ children }) => {
  return (
    <Grid gap={1} columns={[7, 7, 7]}>
      {children}
    </Grid>
  )
}

const MonthDay = ({ image, number, onClick }) => {
  const { GATSBY_CLOUDINARY_CLOUD_NAME } = process.env
  const flags = "w_150,h_150,c_fill,e_grayscale"
  const url = `https://res.cloudinary.com/${GATSBY_CLOUDINARY_CLOUD_NAME}/image/upload/${flags}/${image}.jpg`
  return (
    <Box
      onClick={onClick}
      bg={number ? "muted" : "background"}
      sx={{
        position: "relative",
        height: [40, 80, 128],
        backgroundImage: image && `url(${url})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Heading
        as="h4"
        mr={1}
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          color: image ? "background" : "text",
          fontWeight: 100,
        }}
      >
        {number && number}
      </Heading>
    </Box>
  )
}

const MonthDayName = ({ name }) => {
  return (
    <Heading mt={2} mb={2} as="h3" sx={{ textAlign: "center" }}>
      {name}
    </Heading>
  )
}

const MonthView = ({ month, images, single }) => {
  moment.updateLocale("es", localization)
  const monthDate = moment(month, "/YYYY/MM")
  const firstDay = parseInt(monthDate.startOf("month").format("d"))
  const daysInMonth = parseInt(monthDate.daysInMonth())
  const dayNames = moment.weekdaysShort(true)

  let blanks = []
  for (let i = 1; i < (firstDay === 0 ? 7 : firstDay); i++) {
    blanks.push(<MonthDay key={i} />)
  }

  let days = []
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDay = moment(month, "/YYYY/MM").add(i > 1 ? i - 1 : 0, "day")
    const dayNumber = currentDay.format("DD")
    const dayLink = currentDay.format("/YYYY/MM/DD")
    const dayImage = () => {
      const img =
        images &&
        images.find(
          image =>
            image.image_metadata.CreateDate.lastIndexOf(
              currentDay.format("YYYY:MM:DD"),
              0
            ) === 0
        )
      if (img) {
        return img.public_id
      } else {
        return false
      }
    }

    days.push(
      <MonthDay
        key={dayNumber}
        number={dayNumber}
        image={dayImage()}
        onClick={dayImage() ? () => navigate(`/calendario${dayLink}`) : null}
      />
    )
  }

  return (
    <Box mt={[4, 4, 5]}>
      <MonthTitle single={single}>{monthDate.format("MMMM YYYY")}</MonthTitle>
      <MonthGrid>
        {dayNames.map(dayName => (
          <MonthDayName key={dayName} name={dayName.slice(0, -1)} />
        ))}
        {blanks}
        {days}
      </MonthGrid>
    </Box>
  )
}

export default MonthView
