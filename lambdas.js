'use strict'
const {createFile} = require('./modules/files/lambdas')
const {createUser, loginUser} = require('./modules/users/lambdas')

function makeResponse(result, context) {
    const statusCode = result.statusCode || 200;

    context.succeed({
        statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(result),
    })
}


exports.createFile = async (event, context) => {
    try {
        const response = await createFile(event)
        Object.assign(response, {statusCode: 201})
        makeResponse(response, context);
    } catch (error) {
        console.error(error)
        makeResponse({error: true, message: error.message, statusCode: 400}, context)
    }
}

exports.createUser = async (event, context, callback) => {

    try {
        const response = await createUser(event)
        Object.assign(response, {statusCode: 201})
        makeResponse(response, context);
    } catch (error) {
        console.error(error)
        makeResponse({error: true, message: error.message, statusCode: 400}, context)
    }
}
exports.loginUser = async (event, context) => {
    try {
        const response = await loginUser(event)
        Object.assign(response, {statusCode: 200})
        makeResponse(response, context);
    } catch (error) {
        console.error(error)
        makeResponse({error: true, message: error.message, statusCode: 401}, context)
    }

}
