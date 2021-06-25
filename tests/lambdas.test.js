const fetch = require('isomorphic-fetch')
const FormData = require('isomorphic-form-data');
const fs = require('fs-extra');


const IS_PROD = false
const host = 'jw6pr5u674.execute-api.us-east-1.amazonaws.com' // set production url
const apiEndpoint = IS_PROD
    ? 'https://' + host + '/dev/secure-api-files/'
    : 'http://localhost:3000/dev/secure-api-files'

const headers = {
    "Access-Control-Allow-Origin": "*",
    'Accept': 'application/json, application/xml, text/play, text/html, *.*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
}

jest.setTimeout(1 * 60 * 1000)

describe("POST FILES", () => {
    test("successful updates or creates an image and receive http status 201", async () => {
        const HTTP_STATUS_CREATED = 201;
        return new Promise(async (resolve, reject) => {
            const form = new FormData();
            const imageReadableStream = await fs.createReadStream(__dirname + '/assets/tenor.gif')
            form.append('img', imageReadableStream);

            const response = await fetch(apiEndpoint, {
                headers: headers,
                method: 'POST',
                body: form
            })

            const {ETag, Location, key} = await response.json()

            //asserts
            expect(response.status).toBe(HTTP_STATUS_CREATED)
            expect(ETag).not.toBe(null)
            expect(Location).not.toBe(null)
            expect(key).not.toBe(null)

            resolve()
        })

    });

    test("receive error trying to upload a non image file and receive http status 400", async () => {
        const HTTP_STATUS_BAD_REQUEST = 400
        const INVALID_IMAGE_FORMAT_ERROR_MESSAGE = "invalid image format"
        return new Promise(async (resolve, reject) => {


            const form = new FormData();
            const nonImageReadableStream = await fs.createReadStream(__dirname + '/assets/non_image_file.txt')
            form.append('img', nonImageReadableStream);

            const response = await fetch(apiEndpoint, {
                headers: headers,
                method: 'POST',
                body: form
            })
            const {error, message} = await response.json()

            //asserts
            expect(response.status).toBe(HTTP_STATUS_BAD_REQUEST)
            expect(error).toBe(true)
            expect(message).toBe(INVALID_IMAGE_FORMAT_ERROR_MESSAGE)
            resolve()
        })

    });
})
