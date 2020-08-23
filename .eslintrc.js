module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "settings": {
        "react": {
          "version": "detect"
        }
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "arrow-parens": ["error", "as-needed", { "requireForBlockBody": true }]
    },
    "settings": {
        "import/resolver":{
            "node": {
              "extensions": [
                ".jsx"
              ]
            }
    }}
};