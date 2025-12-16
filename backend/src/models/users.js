const {connectDB}= require("../config/mongo");
const bcrypt = require("bcrypt")
const crypto = require("crypto");

function hashLoginKey(loginKey) {
  return crypto
    .createHmac("sha256", process.env.HASH_SECRET_KEY)
    .update(loginKey)
    .digest("hex");
}

const hash = async(password)=>{
    const saltround = 12;
    const hashed = await bcrypt.hash(password,saltround);
    return hashed;
}

const checkuser = async(loginkey)=>{

    let db=await connectDB();
    if(!db){
        const error = new Error("Database Connection Error");
        error.statuscode = 404;
        throw error;
    }
    const users = db.collection("users");
    if(!users){
        const err = new Error("Database Collection Error");
        err.statuscode = 404;
        throw err;
    }
    const hashed = hashLoginKey(loginkey);
    const user = await users.findOne({loginkey: hashed});
    return user;
}

const checkusername = async(username)=>{
    let db=await connectDB();
    if(!db){
        const error = new Error("Database Connection Error");
        error.statuscode = 404;
        throw error;
    }
    const users = db.collection("users");
    if(!users){
        const err = new Error("Database Collection Error while checking user");
        err.statuscode = 404;
        throw err;
    }
    try{
    const user = await users.findOne({username:username});
    return user;
    }catch(error){
        const err = new Error("error fetching username");
        err.statuscode = 404;
        throw err;
    }
}

// src/models/users.js

// ... existing imports

const update = async(loginkey, data) => {
    let db = await connectDB();
    if(!db){
        const error = new Error("Database Connection Error while updating user data");
        error.statuscode = 404;
        throw error;
    }
    const users = db.collection("users");
    if(!users){
        const err = new Error("Database Collection Error while updating user data");
        err.statuscode = 404;
        throw err;
    }
    try {
        // FIX 1: Hash the login key so it matches what is in the database
        const hashed = hashLoginKey(loginkey);

        // FIX 2: Use "username" as the key, and explicitly set details to true
        // Note: 'data' variable contains the username string passed from controller
        const user = await users.updateOne(
            { loginkey: hashed },
            { 
                $set: { 
                    username: data,   // Save specifically to 'username' field
                    details: true     // Mark profile as completed
                } 
            }
        );
        return user;
    }
    catch(error){
        const err = new Error("error updating data", data);
        err.statuscode = 404;
        throw err;
    }
}

// ... existing exports

const loginuser = async(loginkey,password)=>{

    let db=await connectDB();
    const users = db.collection("users");
    const hashed =  hashLoginKey(loginkey);
    const user = await users.findOne({loginkey:hashed});
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        const err = new Error("Invalid credentials");
        err.statuscode = 404;
        throw err;
    }
    return user;
}

const createuser = async (data) => {
    let db = await connectDB();

    if (!data.loginkey || !data.password) {
        const err = new Error("Empty fields not allowed");
        err.statuscode = 400;
        throw err;
    }

    const users = db.collection("users");

    const userData = {
        loginkey: hashLoginKey(data.loginkey),
        password: await hash(data.password),
        details:data.details,
        created_at: new Date()
    };

    const result = await users.insertOne(userData);
    return result;
};


function randomKey(dict, length = 10) {
    let key = "";
    for (let i = 0; i < length; i++) {
        key += dict[Math.floor(Math.random() * dict.length)];
    }
    return key;
}

const getunique = async () => {
    const dict = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$*";
    const db = await connectDB();
    const users = db.collection("users");

    while (true) {
        const plainKey = randomKey(dict);
        const hashedKey = hashLoginKey(plainKey);

        const exists = await users.findOne({ loginkey: hashedKey });
        if (!exists) {
            return plainKey; // ONLY plain key is returned
        }
    }
};


module.exports = {checkuser,loginuser,createuser,getunique,checkusername,update};