const mongoose = require('mongoose');


const DBConnection=async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName:process.env.DB_NAME
        };
        await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`,options);

        console.log("Conexión exitosa a bases de datos");
    } catch (error) {
        console.log(error)
        throw new Error("Error de conexión a la bases de datos")
    }
}
module.exports=DBConnection;