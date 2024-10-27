const mongoose = require("mongoose");

const ParkingOwnerSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    parking_location: { 
        type: String, 
        required: true 
    },
    camera_ip_access: { 
        type: String 
    },
    parking_payments: { 
        type: Array, 
        default: [] 
    }
});

module.exports = mongoose.model("ParkingOwner", ParkingOwnerSchema);
