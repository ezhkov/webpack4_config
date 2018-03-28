// https://eslint.org/docs/user-guide/configuring

module.exports = {
  "env": {
    "jquery": true
  },
  "extends": "airbnb-base",
  "globals": {
    "Swiper": true,
    "isMobile": true,
    "Cleave": true,
    "PS": true,
    "baron": true,
    "document": true,
    "window": true,
    "FormData": true,
    "fetch": true,
    "navigator": true,
    "_": true
  },
  "rules": {
    "class-methods-use-this": [0],
    "func-names": [0, "never"],
    "max-len": [1, 180, 2, {"ignoreComments": true}],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "new-cap": ["error", { "properties": false }],
    "radix": [0],
    "no-unused-vars": [1, {"vars": "local", "args": "none"}],
    "no-use-before-define": [0],
    "no-new": [0],
    "import/prefer-default-export": [0],
    "no-plusplus": [0],
    "no-prototype-builtins": 0,
    "no-underscore-dangle": 0,
    "no-continue": 0,
    "no-param-reassign": 0,
    "import/no-dynamic-require": 0,
  }
}

