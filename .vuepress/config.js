module.exports = {
    plugins: {
        "@vuepress/pwa": {
            serviceWorker: false,
            updatePopup: false,
        },
        "@vuepress/nprogress": true,
        "@vuepress/back-to-top": true,
        "@vuepress/medium-zoom": true,
        "reading-progress": true,
        sitemap: {
            hostname: "https://jswebdev2.netlify.app",
        },
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
    /*  shouldPrefetch: () => false,
        shouldPreload: () => false, */
};