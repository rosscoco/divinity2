module.exports = {
    "extends": "airbnb-base",
    rules:{
        "linebreak-style": 0,
        "no-console":0,
        "indent": ["error", "tab"],
        "no-tabs":0,
        "max-len":0,
        "no-plusplus":0,
        "comma-dangle":0,
        "func-names":0,
        "no-prototype-builtins":0,
        "consistent-return":0,
        "no-debugger":0,
        "indent": ["error", "tab", { "MemberExpression": 1 }],
        "prefer-arrow-callback":"warn",
        "object-curly-newline": ["warn", {
            "ObjectExpression": "never",
            "ObjectPattern": { "multiline": true },
            "ImportDeclaration": "never",
            "ExportDeclaration": { "multiline": true, "minProperties": 3 }
        }]
      }
};
