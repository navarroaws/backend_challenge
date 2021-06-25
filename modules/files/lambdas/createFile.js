'use strict'
const AWS = require('aws-sdk')
const S3 = new AWS.S3(require('../../../s3config.js')())
const multipart = require('aws-lambda-multipart-parser');

module.exports = async (event) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg', 'image/bmp', 'image/svg+xml', 'image/gif'];

    const result = multipart.parse(event, true)
    console.log('result',result)
    const {content, contentType, filename} = result[Object.keys(result)[0]]
    console.log('content',content)
    if (!allowedMimes.includes(contentType)) {
        throw new Error('invalid image format')
    }

    return S3.upload({
        Bucket: process.env.BUCKET_NAME,
        Key: filename,
        Body: content,
        ContentType: contentType,
    }).promise()
}
