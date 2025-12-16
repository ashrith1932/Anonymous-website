const express = require("express");
const router = express.Router();
const  authcontrollers = require("../controllers/authcontrollers")

router.post("/login",authcontrollers.login);
router.post("/signup",authcontrollers.signup);
router.get("/generateloginkey",authcontrollers.generateloginkey);
router.post("/checkusername",authcontrollers.checkusername);
router.post("/updatedata",authcontrollers.update);

module.exports=router;