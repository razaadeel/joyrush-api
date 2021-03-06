const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
            select: false
        },
    },
    { timestamps: true }
)

module.exports = User = mongoose.model('users', UserSchema);