const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        bookingType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'booking_types',
            required: true
        },
        distanceCovered: {
            type: String,
        },
        timeTaken: {
            type: String,
        },
        estimatedPrice: {
            type: String,
        },
        origin: {
            lat: {
                type: String,
                required: true
            },
            lng: {
                type: String,
                required: true
            }
        },
        destination: {
            lat: {
                type: String,
                required: true
            },
            lng: {
                type: String,
                required: true
            }
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('bookings', BookingSchema);