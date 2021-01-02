import { swiss as light, deep as dark } from "@theme-ui/presets"
import { merge } from "theme-ui"

export default merge(light, {
  colors: {
    modes: {
      dark: {
        ...dark.colors,
      },
    },
  },
  sizes: {
    container: 768,
  },
  fonts: {
    body: `'Roboto', sans-serif`,
    heading: `'Roboto', sans-serif`,
  },
  fontWeights: {
    body: 400,
    heading: 100,
    display: 100,
    bold: 700,
  },

  styles: {
    a: {
      color: "primary",
      textDecoration: "none",
      "&:hover": {
        color: "secondary",
      },
    },
    code: {
      bg: `muted`,
      px: 1,
      borderRadius: 3,
    },
  },
})
