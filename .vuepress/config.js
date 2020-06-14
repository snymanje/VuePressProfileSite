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
    shouldPrefetch: (file, type) => {
        // type is inferred based on the file extension.
        // https://fetch.spec.whatwg.org/#concept-request-destination
        if (type === "script" || type === "style") {
            return true;
        }
        if (type === "font") {
            // only preload woff2 fonts
            return /\.woff2$/.test(file);
        }
        if (type === "image") {
            // only preload important images
            return file === "profile9.png";
        }
    },
};