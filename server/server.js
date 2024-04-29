const express = require('express');
const io = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

// ! enabling cors and json parsing
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);

// * 👇  Connecting to MongoDB database
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/rps-db");
}

const db = mongoose.connection;
db.once("connected", () => console.log("Connected to MongoDB!"));
// ---------------------------------------------------------------------------------

const salt = bcrypt.genSaltSync(10); // salt for password hashing
const jwtSalt = "lshjogihqwoihq209u523h5klhdklhfowieh"; //jwt salt for signing tokens

server.listen(3001, () => { console.log("Listening on port 3001"); });