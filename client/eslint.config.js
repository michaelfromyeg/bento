import js from "@eslint/js";
import globals from "globals";

export default [
    { ignores: ["dist/"] },
    js.configs.recommended,
    {
        files: ["assets/js/**/*.js"],
        languageOptions: {
            globals: { ...globals.browser, lucide: "readonly" },
        },
    },
    {
        files: ["test/**/*.js", "eslint.config.js"],
        languageOptions: { globals: globals.node },
    },
];
