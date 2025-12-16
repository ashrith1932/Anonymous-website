const user = require("../models/users");

const login = async(req, res) => {
    try {
        // Validate input
        if (!req.body.loginkey || !req.body.password) {
            return res.status(400).json({
                message: "Login key and password are required"
            });
        }

        const existingUser = await user.checkuser(req.body.loginkey);
        
        if (!existingUser) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const loggedInUser = await user.loginuser(req.body.loginkey, req.body.password);
        
        return res.status(200).json({
            message: "Login successful",
            user: {
                details:loggedInUser.details
            }
        });
        
    } catch(error) {
        console.error("Login error:", error);
        return res.status(error.statusCode || 500).json({
            message: error.message || "Internal server error during login"
        });
    }
}

const signup = async(req, res) => {
    try {
        // Validate input
        if (!req.body.loginkey || !req.body.password) {
            return res.status(400).json({
                message: "Login key and password are required"
            });
        }

        if (req.body.loginkey.trim() === "" || req.body.password.trim() === "") {
            return res.status(400).json({
                message: "Login key and password cannot be empty"
            });
        }

        // Check if user already exists
        const existingUser = await user.checkuser(req.body.loginkey);
        
        if (existingUser) {
            return res.status(409).json({
                message: "Account already exists"
            });
        }

        // Create new user - PASS THE ENTIRE OBJECT
        const newUser = await user.createuser({
            loginkey: req.body.loginkey,
            password: req.body.password,
            details:false
        });

        return res.status(201).json({
            message: "Signup successful",
            user: {
                details:false
            }
        });
        
    } catch(error) {
        console.error("Signup error:", error);
        return res.status(error.statusCode || 500).json({
            message: error.message || "Internal server error during signup"
        });
    }
}

const generateloginkey = async(req, res) => {
    try {
        const loginkey = await user.getunique();
        
        if (!loginkey) {
            return res.status(500).json({
                message: "Failed to generate login key"
            });
        }

        return res.status(200).json({
            loginkey: loginkey,
            message: "Key generated successfully"
        });
        
    } catch(error) {
        console.error("Generate key error:", error);
        return res.status(error.statusCode || 500).json({
            message: error.message || "Internal error while generating key"
        });
    }
}

const checkusername = async(req,res)=>{
    try{
        const username = req.body.username;
        const v = await user.checkusername(username);
        if(!v){
            return res.status(200).json({
                available:true,
            })
        }
        else{
            return res.status(200).json({
                available:false,
            })
        }
    }catch(error){
        console.error("Internal user error :",error);
        return res.status(error.statusCode || 500).json({
            message: error.message || "Internal error while checking username"
        });
    }
}

const update=async(req,res)=>{
    try{
        const data = req.body.data;
        const loginkey = req.body.loginkey;
        const v = await user.update(loginkey,data);
        if(v){
            res.status(201).json({
                data:v
            })
        }else{
            return res.status(error.statusCode || 500).json({
                message: error.message || "Internal error while updating data"
            });
        }
    }catch(error){
        console.error("Internal user error :",error);
        return res.status(error.statusCode || 500).json({
            message: error.message || "Internal error while updating data"
        });
    }
}


module.exports = { login, signup, generateloginkey,checkusername,update };