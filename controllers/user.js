const User = require("../models/user");

const obtainUsers = async() => {
    try {
        
        const data = await User.find({}, {password:0, email:0});

        return {
            ok: true,
            data
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: 'Hable con el administrador'
        }
    }
}

module.exports = {
    obtainUsers
}