const express = require("express");
const passport = require("passport");
const router = express.Router();
const Song = require("../models/Song.model");
const User = require("../models/User.model");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, thumbnail, track } = req.body;
    if (!name || !thumbnail || !track)
      return res.status(300).json({ err: "fields are empty" });

    const artist = req.user._id;
    const songDetails = { name, thumbnail, track, artist };
    const createdSong = await Song.create(songDetails);

    return res.status(200).json(createdSong);
  }
);

router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // const currentUser = req.user;
    const songs = await Song.find({ artist: req.user._id }).populate("artist");

    return res.status(200).json({ data: songs });
  }
);

router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { artistId } = req.params;

    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(301).json({ err: "Artist Not Found.." });
    }

    const songs = await Song.find({ artist: artistId });

    return res.status(200).json({ data: songs });
  }
);

router.get(
  "/get/songname/:songName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { songName } = req.params;
    const song = await Song.find({ name: songName }).populate("artist");

    return res.status(200).json({ data: song });
  }
);

module.exports = router;
