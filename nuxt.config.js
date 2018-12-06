const pkg = require("./package");

module.exports = {
    mode: "spa",

    /*
     ** Headers of the page
     */
    head: {
        title: "E-letronic E-commerce",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "description",
                name: "description",
                content: pkg.description
            }
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: "#f79813"
    },

    /*
     ** Global CSS
     */
    css: ["~assets/app.styl"],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: ["~plugins/fireauth.js"],

    /*
     ** Nuxt.js modules
     */
    modules: ["@nuxtjs/vuetify"],

    // https://vuetifyjs.com/en/style/colors
    vuetify: {
        theme: {
            primary: "#f79813",
            info: "#11b6f7",
            error: "#db1111",
            success: "#1dad50"
        }
    },

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extractCSS: true,
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/,
                    options: {
                        emitWarning: true
                    }
                });
            }
        }
    }
};
