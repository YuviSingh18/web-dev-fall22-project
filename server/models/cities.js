const { connect } = require('./mongo');

async function collection() {
    const client = await connect();
    return client.db('Fitness').collection('states');
}

async function getStates(i) {
    const db = await collection();
    const data = await db.find( { name: {$regex: "ne"} } ).toArray();
    return data;
}

module.exports = {
    getStates
}