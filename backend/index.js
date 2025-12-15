require("dotenv").config();   // load .env once
require("./src/config/mongo");      // connect DB
require("./src/server");         // start server