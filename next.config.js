const nextTranslate = require('next-translate')

module.exports = {
    ...nextTranslate(),
    target: 'experimental-serverless-trace'
}