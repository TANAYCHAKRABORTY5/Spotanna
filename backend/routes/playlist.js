const express = require("express");
const passport = require("passport");
const Playlist = require("../models/Playlist.model");
const User = require("../models/User.model");
const Song = require("../models/Song.model");

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { name, thumbnail, songs } = req.body;
    if (!name || !thumbnail || !songs) {
      return res
        .status(301)
        .json({ err: "Error occured while creating a playlist" });
    }

    const playlistData = {
      name,
      thumbnail,
      songs,
      owner: currentUser._id,
      collaborators: [],
    };

    const playlist = await Playlist.create(playlistData);

    return res.status(200).json({ playlist });
  }
);

router.get(
  "/get/playlist/:playlistId", //here :playlistId means that it is a variable to which we can assign any value
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findOne({ _id: playlistId }).populate({
      path: "songs",
      populate: {
        path: "artist",
      },
    });
    if (!playlist) {
      return res.status(301).json({ err: "Invalid Id" });
    }

    return res.status(200).json(playlist);
  }
);

//to get all the playlist made by an artist

router.get(
  "/get/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.user._id;

    const playlists = await Playlist.find({ owner: artistId }).populate(
      "owner"
    );
    return res.status(200).json({ data: playlists });
  }
);

router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.params.artistId;

    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(301).json({ err: "Invalid artist Id" });
    }
    const playlists = await Playlist.find({ owner: artistId });
    return res.status(200).json({ data: playlist });
  }
);

router.post(
  "/add/song",
  passport.authenticate("jwt", { session: false }),

  async (req, res) => {
    const currentUser = req.user;
    const { playlistId, songId } = req.body;

    const playlist = await Playlist.findOne({ _id: playlistId });

    if (!playlist) {
      return res.status(304).json({ err: "no playlist found with this id" });
    }

    if (
      !playlist.owner.equals(currentUser._id) &&
      !playlist.collaborators.includes(currentUser._id)
    ) {
      return res.status(400).json({ err: "Not Allowed" });
    }

    //check if the song is valid
    const song = await Song.findOne({ _id: songId });
    if (!song) {
      return res.status(304).json({ err: "Song does not exists" });
    }

    playlist.songs.push(songId);
    await playlist.save();
    // console.log("✅ Successfully added song to playlist, sending response now");

    return res.status(200).json(playlist);
  }
);

module.exports = router;
