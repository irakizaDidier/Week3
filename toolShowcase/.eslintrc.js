module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 2015,
        sourceType: 'module'
    },
    rules: {
        'no-console': 'off'
    }
};