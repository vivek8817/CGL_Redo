const mongoose = require('mongoose');

const uri = "mongodb+srv://task:D4ynAcK5t4GvInD0@cluster0.aa0kisk.mongodb.net/cglRedo?retryWrites=true&w=majority";

const checkUsers = async () => {
    try {
        await mongoose.connect(uri);
        const db = mongoose.connection.db;
        const users = await db.collection('users').find({}).toArray();
        console.log("Users in DB:", users.map(u => ({ email: u.email, username: u.username })));
    } catch(err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
};

checkUsers();
