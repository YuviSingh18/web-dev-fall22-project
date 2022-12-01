require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://singhy2:singhy2@cluster0.2e3akrd.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1 } });
module.exports = {
    connect: () => client.connect()
}