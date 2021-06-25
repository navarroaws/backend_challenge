const memoryDb = require("../../../config/db")

const USER_COLLECTION = 'users'
const createUser = async (user) => {
    return memoryDb.create(USER_COLLECTION, user)
}

const findUserByEmail = (userEmail) => {

    if (!userEmail) {
        throw new Error('please inform a valid e-mail')
    }

    const users = memoryDb.find(USER_COLLECTION)
    console.log("users")
    console.log(users)
    if (!users) {
        throw new Error('user not found')
    }

    const user = users.find(({email}) => email === userEmail)
    if (!user) {
        throw new Error('user not found')
    }

    return user
}

module.exports = {
    createUser,
    findUserByEmail
}
