const express =require('express');
const cors = require('cors');
const authRoutes = require('./routes/authroutes.js');

const app = express();

app.use(
  cors({
    origin: process.env.FRONT_URL,    // Vite frontend URL
    credentials: true,               // allow cookies / auth headers
  })
);

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});


module.exports = app;