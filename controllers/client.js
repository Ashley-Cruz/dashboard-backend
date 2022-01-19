const { findById } = require("../models/card");
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

const updateClient = async(payload) => {
    try {
        const {id} = payload;

        const clientUpdated = await Client.findByIdAndUpdate(id, payload);
        
        return {
            ok: true,
            data: clientUpdated
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: 'Hable con el administrador'
        }
    }
}

const deleteClient = async(id) => {

    try {
        
        const clientDelete = await Client.findByIdAndUpdate(id, {active: false});
        const cardDelete = await Card.findByIdAndUpdate(clientDelete.card, {active: false});

        return {
            ok: true,
            clientDelete,
            cardDelete
        }

    } catch (error) {
        return {
            ok: false,
            msg: 'Hable con el administrador'
        }
    }
}

module.exports = {
    createClient,
    obtainListClients,
    updateClient,
    deleteClient
}