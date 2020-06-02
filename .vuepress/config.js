module.exports = {
  markdown: {
    lineNumbers: true,
  },
  postcss: {
    plugins: [
      require("autoprefixer"),
      require("tailwindcss")("./tailwind.config.js"),
    ],
  },
  title: "Jean Snyman",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Blog", link: "/pages/" },
    ],
  }
};
