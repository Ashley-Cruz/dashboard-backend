const { Schema, model } = require("mongoose");

const ClientSchema = Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: Number,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String
    },
    fathersLastName: {
        type: String,
        required: true
    },
    motherslastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    analyst: {
        type: String,
        required: true
    },
    card: {
        _id: String,
        type: Schema.Types.ObjectId,
        ref: 'Card',
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

ClientSchema.methods.toJSON = function(){
    const {__v, _id, ...client} = this.toObject();
    client.id = _id;
    return client;
}

module.exports = model('Client', ClientSchema);