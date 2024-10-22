const jwt = require("jsonwebtoken");

const authmiddle = function (req, res, next) {
    console.log("Hello in AUTH");
    try {
        const token = req.cookies.token;
        console.log(token);
        if (!token) {
            return res.json({ Error: "You Are Failed in Middle Ware", success: false });
        } else {
            jwt.verify(token, "TPlanner", function (err, decoded) {
                if (err) {
                    return res.json({ Error: "Token Error in verification", success: false });
                } else {
                    // Store user ID and section in request object
                    req.userid = decoded.id;
                    req.section = decoded.section; // Extract section from the decoded token
                    console.log("User ID: ", req.userid);
                    console.log("User Section: ", req.section);
                    console.log();
                    next();
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: "Internal Server Error", success: false });
    }
};

module.exports = { authmiddle };
