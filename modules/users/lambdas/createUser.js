'use strict'
const bcrypt = require('bcrypt');
const saltRounds = 10;

const {createUser} = require('../dao')
module.exports = async (event) => {

    const user = JSON.parse(event.body)
    const hash = bcrypt.hash(user.password, saltRounds)

    Object.assign(user, {hash})
    Reflect.deleteProperty(user, 'password')

    return createUser(user)
}
