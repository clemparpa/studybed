/** @type {import('tailwindcss').Config} */

const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
const em = (px, base) => `${round(px / base)}em`;
const rem = (px) => `${round(px / 16)}rem`;

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  important: true,
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            blockquote: {
              fontSize: em(14, 16),
              lineHeight: round(28 / 16),
              marginTop: em(32, 16),
              marginBottom: em(32, 16),
              borderRadius: rem(6),
              paddingTop: em(16, 16),
              paddingRight: em(24, 16),
              paddingBottom: em(16, 16),
              paddingLeft: em(24, 16),
              margin: "1em 0px",
              display: "block",
              fontFamily: "monospace",
              fontStyle: "normal",
              color: theme("colors.zinc.200"),
              backgroundColor: theme("colors.slate.800"),
              overflowX: "auto",
              fontWeight: "400",
              content: "none",
              quotes: "none",
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
