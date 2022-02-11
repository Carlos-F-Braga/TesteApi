const mongoose = require('mongoose');

class Connection {
    constructor() {
        this.dataBaseConnectionMongoDB();
      //this.dataBaseConnectionMySQL(); possível this futuro da conexão ao MySQL
    }

    dataBaseConnectionMongoDB() {
        this.mongoDBConnection = mongoose.connect("mongodb://localhost/nodejs", {
         
        })
        .then(() => {
            console.log("Conexão estabelecida com o MongoDB");
        })
        .catch((error) => {
            console.log(`Erro ao estabelecer conexão com mongoDB: ${error}`);
        })
    }

    /*dataBaseConnectionMySQL() {
        Conexão possível ao MySQL

    }
    */ 
}
module.exports = new Connection();