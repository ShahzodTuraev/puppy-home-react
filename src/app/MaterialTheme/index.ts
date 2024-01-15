import { createTheme } from "@mui/material/styles";
import { common } from "@mui/material/colors";

/**
 * LIGHT THEME (DEFAULT)
 */
const light = {
  palette: {
    type: "light",
    background: {
      default: "#ffffff",
      paper: common.white,
    },
    primary: {
      contrastText: "#ffffff",
      main: "#fc9823",
    },
    secondary: {
      main: "#346aff",
    },
    text: {
      primary: "#172b4d",
      secondary: "#6b778c",
      dark: common.black,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          height: "100%",
          // background: "#c40909",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: "100%" },
        body: { background: "#ffffff", height: "100%", minHeight: "100%" },
      },
    },
  },
};

// A custom theme for this app
let theme = createTheme(light);
theme = createTheme(theme, {
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          [theme.breakpoints.up("lg")]: {
            maxWidth: "1320px",
            padding: 0,
          },
        },
      },
    },
  },
});
export default theme;
