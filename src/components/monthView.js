/** @jsx jsx */
import { jsx } from "theme-ui"
import { Box, Grid, Heading, Flex, IconButton } from "@theme-ui/components"
import { Fragment } from "react"
import { navigate } from "gatsby"
import dayjs from "dayjs"
import locale from "dayjs/locale/es" // load on demand
dayjs.locale("es") // use Spanish locale globally

const Day = ({ image, number, onClick }) => {
  const { GATSBY_CLOUDINARY_CLOUD_NAME } = process.env
  const flags = "w_150,h_150,c_fill,e_grayscale,e_tint:50:red"
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

const MonthView = ({ month, images, single }) => {
  const monthDate = dayjs(month, "/YYYY/MM")
  const date = monthDate.format("MMMM YYYY")
  const firstDay = parseInt(monthDate.startOf("month").format("d"))
  const daysInMonth = parseInt(monthDate.daysInMonth())
  const dayNames = locale.weekdaysMin
  const nextMonth = dayjs(date, "MMMM YYYY").add(1, "month")
  const nextMonthLink = nextMonth.format("/YYYY/MM")
  const prevMonth = dayjs(date, "MMMM YYYY").subtract(1, "month")
  const prevMonthLink = prevMonth.format("/YYYY/MM")

  let blanks = []
  for (let i = 1; i < (firstDay === 0 ? 7 : firstDay); i++) {
    blanks.push(<Day key={i} />)
  }

  let days = []
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDay = dayjs(month, "/YYYY/MM").add(i > 1 ? i - 1 : 0, "day")
    const dayNumber = currentDay.format("DD")
    const dayLink = currentDay.format("/YYYY/MM/DD")
    const dayImage = () => {
      const img =
        images &&
        images.find(
          image =>
            image.context.custom.createDate.lastIndexOf(
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
      <Day
        key={dayNumber}
        number={dayNumber}
        image={dayImage()}
        onClick={dayImage() ? () => navigate(`/archivo${dayLink}`) : null}
      />
    )
  }

  return (
    <Fragment>
      <Flex my={2}>
        {single && (
          <Box>
            <IconButton
              sx={{
                opacity: monthDate.format("/YYYY/MM") === "/2019/10" ? 0 : 1,
              }}
              aria-label="mes anterior"
              onClick={
                monthDate.format("/YYYY/MM") !== "/2019/10"
                  ? () => navigate(`/archivo${prevMonthLink}`)
                  : null
              }
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
                  stroke={"#707070"}
                  strokeWidth="1"
                />
              </svg>
            </IconButton>
          </Box>
        )}
        <Box sx={{ flex: 1, margin: "auto" }}>
          <Heading sx={{ textAlign: "center" }}>{date}</Heading>
        </Box>
        {single && (
          <Box>
            <IconButton
              sx={{
                opacity: monthDate.format("/YYYY/MM") === "/2020/01" ? 0 : 1,
              }}
              aria-label="mes siguiente"
              onClick={
                monthDate.format("/YYYY/MM") !== "/2020/01"
                  ? () => navigate(`/archivo${nextMonthLink}`)
                  : null
              }
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
        )}
      </Flex>
      <Grid my={2} gap={1} columns={[7, 7, 7]}>
        {dayNames.map(dayName => (
          <Heading
            key={dayName}
            mt={2}
            mb={2}
            as="h3"
            sx={{ textAlign: "center" }}
          >
            {dayName}
          </Heading>
        ))}
        {blanks}
        {days}
      </Grid>
    </Fragment>
  )
}

export default MonthView
