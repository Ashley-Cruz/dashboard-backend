const { Schema, model } = require("mongoose");

const CardSchema = Schema({

    cardNumber: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
    },
    cvv: {
        type: String,
        required: true
    },
    pin: {
        type: Number,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

CardSchema.methods.toJSON = function(){
    const {__v, _id, ...card} = this.toObject();
    card.id = _id;
    return card;
}

module.exports = model('Card', CardSchema);