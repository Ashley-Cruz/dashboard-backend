const Card = require("../models/card");
const Client = require("../models/client");

const createClient = async(payload) => {

    const email = payload.email.trim();
    const firstName = payload.firstName.trim();
    const secondName = payload.secondName.trim();
    const fathersLastName = payload.fathersLastName.trim();
    const motherslastName = payload.motherslastName.trim();
    const analyst = payload.analyst.trim();

    try {

        const dataCard = {
            ...payload
        }

        const card = new Card(dataCard);
        await card.save();
        
        const dataClient = {
            ...payload,
            email,
            firstName,
            secondName,
            fathersLastName,
            motherslastName,
            analyst,
            card: card.id
        }

        const client = new Client(dataClient);
        await client.save();

        const data = await Client.findById(client.id)
            .populate('card')

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

const obtainListClients = async() => {

    try {
        
        const data = await Client.find({active: true})
            .populate('card')
            .sort({createdAt: 'desc'})

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
    createClient,
    obtainListClients
}