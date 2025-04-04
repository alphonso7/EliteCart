const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: {
        type:String
    },
    email:{
        type: String,
        unique:true
    },
    password:{
        type:String,
        unique:true
    },
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default: Date.now,
    },
    isAdmin: { type: Boolean, default: false }
})

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;