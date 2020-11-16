const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema(
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
        isOnline: {
            type: Boolean,
            default: false,
        },
        vehicleType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'booking_types'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('drivers', DriverSchema);