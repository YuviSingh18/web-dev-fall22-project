const { connect } = require('./mongo');

async function collection() {
    const client = await connect();
    return client.db('Fitness').collection('users');
}

async function getUsers() {
    const db = await collection();
    const data = await db.find().toArray();
    return data;
}

async function getUser(id) {
    const db = await collection();
    const data = await db.findOne({ userId: id });
    return data;
}

async function deleteUser(id) {
    const db = await collection();
    await db.deleteOne({ userId: id });
}

async function addUser(user) {
    const db = await collection();
    await db.insertOne(user);
}

async function updateUser(id, user) {
    const db = await collection();
    await db.updateOne({ userId: id }, { $set: user });
}

async function login(user) {
    const db = await collection();
    const data = await db.findOne({ username: user.username, password: user.password });
    if(data) {
        return data;
    } else {
        return false;
    }
}

module.exports = {
    collection,
    getUsers,
    getUser,
    deleteUser,
    addUser,
    updateUser,
    login
};