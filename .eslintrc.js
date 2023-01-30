module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        'no-unused-vars' : 'warn',
    },
    "extends": ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
    "plugins": ['prettier'],
}
