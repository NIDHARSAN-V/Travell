// Controllers/userController.js

const userModel = require("../Models/usermodel");

const ProfileController = async (req, res) => {
    const { userid } = req.body; // Get user ID from the request body
    console.log(userid)

    console.log("Fetching User Data for ID:", userid);

    try {
  
        const user = await userModel.findById(userid);

     
        if (!user) {
            return res.status(404).send({ message: "User Not Found", success: false });
        }

       
        const { password, ...userData } = user.toObject();

        
        res.status(200).send({ success: true, user: userData });
    } catch (error) {
        console.error("Get User Error:", error); 
        res.status(500).send({
            success: false,
            message: `Get User Controller: ${error.message}`,
        });
    }
};

module.exports = { ProfileController };
