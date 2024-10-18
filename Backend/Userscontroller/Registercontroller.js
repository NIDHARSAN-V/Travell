const userModel = require("../Models/usermodel");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
    console.log(req.body); // Logging request body for debugging

    try {
        // Check if user already exists by email
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).send({ message: "User Already Exists", success: false });
        }

        // Check if the phone number is already in use
        const existingPhoneUser = await userModel.findOne({ phone: req.body.phone });
        if (existingPhoneUser) {
            return res.status(409).send({ message: "Phone number already in use", success: false });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user instance with hashed password and section from request body
        const newUser = new userModel({
            username: req.body.username, // Explicitly assigning each field for clarity
            email: req.body.email,
            phone: req.body.phone,
            section: req.body.section || "traveler", // Set default section if not provided
            password: hashedPassword, // Use the hashed password
            isAdmin: false // Default value for isAdmin
        });

        // Save the new user to the database
        await newUser.save();
        res.status(201).send({ message: "Registered Successfully", success: true });
    } catch (error) {
        console.error("Registration Error:", error); // Log error for debugging
        res.status(500).send({
            success: false,
            message: `Registration Controller: ${error.message}`,
        });
    }
};

module.exports = { registerController };
