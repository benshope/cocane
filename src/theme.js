import get from "lodash/get";

const colors = {
  primary50: "#EDF3FE",
  primary100: "#D2E0FC",
  primary200: "#9CBCF8",
  primary300: "#548BF4",
  primary400: "#276EF1",
  primary500: "#174EB6",
  primary600: "#123D90",
  primary700: "#0C2960",

  baseUIprimary50: "#EDF3FE",
  baseUIprimary100: "#D2E0FC",
  baseUIprimary200: "#9CBCF8",
  baseUIprimary300: "#548BF4",
  baseUIprimary400: "#276EF1",
  baseUIprimary500: "#174EB6",
  baseUIprimary600: "#123D90",
  baseUIprimary700: "#0C2960",

  negative50: "#FDF0EF",
  negative100: "#FADBD7",
  negative200: "#F4AFA7",
  negative300: "#EB7567",
  negative400: "#E54937",
  negative500: "#AE372A",
  negative600: "#892C21",
  negative700: "#5C1D16",

  warning50: "#FEF3EC",
  warning100: "#FBE2CF",
  warning200: "#F6BA8B",
  warning300: "#F19248",
  warning400: "#ED6F0E",
  warning500: "#B4540B",
  warning600: "#8E4308",
  warning700: "#5F2C06",

  positive50: "#EBF8F2",
  positive100: "#CDEDDE",
  positive200: "#88D3B0",
  positive300: "#43B982",
  positive400: "#07A35A",
  positive500: "#057C44",
  positive600: "#046236",
  positive700: "#034124",

  mono100: "#FFFFFF",
  mono200: "#F7F7F7",
  mono300: "#F0F0F0",
  mono400: "#E5E5E5",
  mono500: "#CCCCCC",
  mono600: "#B3B3B3",
  mono700: "#999999",
  mono800: "#666666",
  mono900: "#333333",
  mono1000: "#000000"
};

const lightTheme = {
  colors,
  primaryFontFamily:
    'UberMove, "Open Sans", "Helvetica Neue", Helvetica, sans-serif',
  shadows: {
    shadow400: "0 1px 4px hsla(0, 0%, 0%, 0.16)",
    shadow500: "0 2px 8px hsla(0, 0%, 0%, 0.16)",
    shadow600: "0 4px 16px hsla(0, 0%, 0%, 0.16)",
    shadow700: "0 8px 24px hsla(0, 0%, 0%, 0.16)",
    overlay0: "inset 0 0 0 1000px hsla(0, 0%, 0%, 0)",
    overlay100: "inset 0 0 0 1000px hsla(0, 0%, 0%, 0.04)",
    overlay200: "inset 0 0 0 1000px hsla(0, 0%, 0%, 0.08)",
    overlay300: "inset 0 0 0 1000px hsla(0, 0%, 0%, 0.12)",
    overlay400: "inset 0 0 0 1000px hsla(0, 0%, 0%, 0.16)",
    overlay500: "inset 0 0 0 1000px hsla(0, 0%, 0%, 0.2)",
    overlay600: "inset 0 0 0 1000px hsla(0, 0%, 0%, 0.24)"
  },
  borders: {
    border100: "1px solid hsla(0, 0%, 0%, 0.04)",
    border200: "1px solid hsla(0, 0%, 0%, 0.08)",
    border300: "1px solid hsla(0, 0%, 0%, 0.12)",
    border400: "1px solid hsla(0, 0%, 0%, 0.16)",
    border500: "1px solid hsla(0, 0%, 0%, 0.2)",
    border600: "1px solid hsla(0, 0%, 0%, 0.24)",
    radius100: "2px",
    radius200: "4px",
    radius300: "8px"
  },
  animation: {
    easeOutCurve: "cubic-bezier(.2, .8, .4, 1)",
    easeInCurve: "cubic-bezier(.8, .2, .6, 1)",
    easeInOutCurve: "cubic-bezier(0.4, 0, 0.2, 1)"
  }
};

export const theme = (path: string[] | string) => (props: Object) =>
  get(props, ["theme", ...path]) || get(lightTheme, path);

export default theme;
