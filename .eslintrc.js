module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["eslint:recommended",
		'plugin:prettier/recommended', 'prettier'],
    "plugins": ['prettier'],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        'no-unused-vars' : 'warn',
    }
}
