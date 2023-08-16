const User = require("../../models/User")

const userCreate = async () => {
    const user = {
        firstName: "Mario",
        lastName: "Silva",
        email: "mario@mail.com",
        password: "123",
        phone: "+1234"
    }
    await User.create(user)
}

module.exports = userCreate