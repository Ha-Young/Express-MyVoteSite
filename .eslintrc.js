module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'rules': {
        'semi': [
            'error',
            'always'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'eol-last': [
            'error',
            'always'
        ],
        'no-unused-vars': [
            'error',
            { 'args': 'none' }
        ],
        'arrow-parens': [
            'error',
            'always'
        ],
        'func-style': [
            'error',
            'expression'
        ]
    }
};
