const mongoose = require("mongoose");

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('BD Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Erro en la conexión');
    }
}

module.exports = {
    dbConnection
}