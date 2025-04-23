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
    isAdmin: { type: Boolean, default: false },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
    address: { type: String, default: '' }

})

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;