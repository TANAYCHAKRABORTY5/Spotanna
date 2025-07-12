const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User.model");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const authRoutes = require("./routes/auth.route.js");
const songRoutes = require("./routes/song.js");
const playlistRoutes = require("./routes/playlist.js");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(
  cors({
    origin: "https://spotaana-frontend.onrender.com", // your frontend URL
    credentials: true,
  })
);

app.use(express.json());
// app.options("*", cors());

mongoose
  .connect(process.env.DB_URL)
  .then((x) => {
    console.log("Connected to MONGODB");
  })
  .catch((err) => {
    console.log("Error while connecting to mongodb");
  });

//jwt password authentication

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ _id: jwt_payload.identifier });
      if (user) return done(null, user);
      else return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

//end auth
app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

app.get("/", (req, res) => {
  res.send("Tanay hero of this world");
});

app.listen(port, (req, res) => {
  console.log("App running on port : ", port);
});
