const express = require("express");
const router = express.Router();
const  authcontrollers = require("../controllers/authcontrollers")

router.post("/login",authcontrollers.login);
router.post("/signup",authcontrollers.signup);
router.get("/generateloginkey",authcontrollers.generateloginkey);

module.exports=router;