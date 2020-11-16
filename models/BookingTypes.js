const mongoose = require('mongoose');

const BookingTypesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        priceMin: {
            type: String,
            required: true
        },
        priceKm: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('booking_types', BookingTypesSchema);