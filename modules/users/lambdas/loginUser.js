'use strict'
const bcrypt = require('bcrypt');
const {findUserByEmail} = require('../dao')
const jwt = require('jsonwebtoken');
const secret = 'navarro'
module.exports = async (event) => {

    const credentials = JSON.parse(event.body)
    const user = findUserByEmail(credentials.email)

    const match = await bcrypt.compare(credentials.password, user.hash)

       return match ? jwt.sign({ user }, secret) : throw new Error("invalid credentials");
}
