const mongoose = require("mongoose");

const ParkingAreaSchema = new mongoose.Schema({
    parking_location: {
        type: String,
        ref:'parkingowner',
        required: true
    },
    parking_owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parkingowner',
        required: true
    },
    camera_ip_access: {
        type: String
    },
    no_of_slots_available: {
        type: Number,
        required: true
    },
    total_no_slots: {
        type: Number,
        required: true
    },
    no_of_slots_booked: {
        type: Number,
        default: 0
    },
    parking_owner_phone: {
        type: String,
        ref:'parkingowner',
        required: true
    },
});

module.exports = mongoose.model("ParkingArea", ParkingAreaSchema);
