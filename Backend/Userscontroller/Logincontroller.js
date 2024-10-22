const userModel = require("../Models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
    try {
        console.log("Entered login");

        // Find the user by email
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: "No User Found", success: false });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid Email or Password", success: false });
        }

        // Validate the section - Ensure that the user belongs to the specified section
        const requiredSection = req.body.section; 
        if (user.section !== requiredSection) {
            return res.status(400).send({ message: "Select Your Working Section, not others", success: false });
        }

        console.log("Successful login");

        // Create and sign a JWT token
        const token = jwt.sign({ id: user._id ,section:user.section}, "TPlanner", { expiresIn: '1d' });
        
        // Set the token in a cookie (optional)
        res.cookie("token", token, { httpOnly: true });
        
        res.status(200).send({ 
            user: { username: user.username, email: user.email, phone: user.phone, section: user.section },
            message: "Login Success",
            success: true,
            token 
        });
    } catch (error) { 
        console.log("Error in Login CTRL:", error); 
        res.status(500).send({ message: `Error in Login CTRL: ${error.message}` }); 
    } 
};

module.exports = { loginController };
