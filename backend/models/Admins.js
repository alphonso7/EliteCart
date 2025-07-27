const mongoose = require("mongoose");


const AdminSchema = new mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: {type: String},
    email: {type: String, unique: true},
    password: {type: String, unique: true},
    accessId: { type: String, unique: true},
    phoneNumber: {type: Number, unique: true}
});

module.exports = mongoose.model("Admins", AdminSchema);