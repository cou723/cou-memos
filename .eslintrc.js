module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:storybook/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.cjs"],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "import",
    "tailwindcss",
    "react-hooks",
  ],
  rules: {
    "@typescript-eslint/no-floating-promises": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          {
            pattern: "{react,react-dom/**,react-router-dom}",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "@src/**",
            group: "parent",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: {
          order: "asc",
        },
        "newlines-between": "always",
      },
    ],
    "@typescript-eslint/consistent-type-imports": ["error", {
      prefer: "type-imports",
    }],

    "react/sort-comp": ["error", {
      order: [
        "static-methods",
        "lifecycle",
        "/^on.+$/",
        "getters",
        "setters",
        "/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/",
        "instance-variables",
        "instance-methods",
        "everything-else",
        "/^render.+$/",
        "render",
      ],
    }],

    "sort-keys": ["error", "asc", { caseSensitive: true, natural: false }],

    "tailwindcss/no-custom-classname": [
      "warn",
      {
        config: "tailwind.config.cjs",
      },
    ],
    "tailwindcss/classnames-order": "off",
  },
};
