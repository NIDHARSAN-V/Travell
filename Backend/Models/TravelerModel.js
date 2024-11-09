const mongoose = require("mongoose");

const travelerSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users', 
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    history_travels: [{
        type: String, 
    }],
    guide_payments: [{
        type: Number, 
    }],
    parking_payments: [{}],
    plans_history: [{
        type: String, 
    }],
}, {
    timestamps: true, 
});

const TravelerModel = mongoose.model("Traveler", travelerSchema);

module.exports = TravelerModel;
