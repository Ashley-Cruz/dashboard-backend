const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    return  new Promise( (resolve, reject) => {
        const payload = {uid};

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log(err),
                reject('No se pudo generar el token')
            }else{
                resolve(token);
            }
        })
    })
}

const validateJWT = (token = '') => {
    try {
        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];
    } catch (error) {
        return [false, null];
    }
}

module.exports = {
    generateJWT,
    validateJWT
}