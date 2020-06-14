module.exports = {
    plugins: {
        "@vuepress/pwa": {
            serviceWorker: true,
            updatePopup: true,
        },
        "@vuepress/nprogress": true,
        "@vuepress/back-to-top": true,
        "@vuepress/medium-zoom": true,
        "reading-progress": true,
    },
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
        searchPlaceholder: "Search...",
        smoothScroll: true,
    },
    shouldPrefetch: () => false,
    shouldPreload: () => false,
};