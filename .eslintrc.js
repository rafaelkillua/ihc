module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    extends: ["eslint:recommended", "plugin:vue/essential", "prettier"],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },
    rules: {
        indent: ["warn", 4],
        quotes: ["warn", "double"],
        semi: ["warn", "always"]
    }
};
