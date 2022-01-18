const { response } = require("express");
const bcrypt = require('bcryptjs');

const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const login = async(req, res) => {

    const {email, password} = req.body;

    try {
        //Validar email
        let validUser = await User.findOne({email});
        if(!validUser){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no válido'
            })
        }

        //Validar password
        let validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no válido'
            })
        }

        //Generar JWT
        const token = await generateJWT(validUser.id);

        res.json({
            ok: true,
            data: {
                name: validUser.name,
                uid: validUser.id,
                token
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const signUp = async(req, res=response) => {

    const {name, email, password} = req.body;

    try {

        let userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            })
        }

        const data = {name, email, password};
        const user = new User(data);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generar JWT
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            data: {
                name,
                uid: user.id,
                token
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const renewToken = async(req, res) => {
    const {uid} = req;

    try {

        //Generar JWT
        const token = await generateJWT(uid);

        const user = await User.findById(uid);

        res.json({
            ok: true,
            data: {
                name: user.name,
                uid,
                token
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login,
    signUp,
    renewToken
}