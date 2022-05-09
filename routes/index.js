var express = require("express");
var router = express.Router();
var request = require("sync-request");
var movieModel = require("../models/movie");
var key = require("../codes");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// =================================/new-movies==============================================

router.get("/new-movies", async function (req, res, next) {
  var result = await request(
    "GET",
    `https://api.themoviedb.org/3/discover/movie?api_key=${key.keyApi}&language=fr&region=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
  );
  var jsonResult = JSON.parse(result.body);
  res.json({ response: "true", movies: jsonResult.results });
});

// ==================================/add wishlist===========================================

router.post("/wishlist-movie", async function (req, res, next) {
  var newMovie = new movieModel({
    movieName: req.body.name,
    movieImg: req.body.img,
  });
  var movieSave = await newMovie.save();
  var result = false;
  if (movieSave) {
    result = true;
  }
  res.json({ response: result });
});

// =====================================/delete wishlist===========================================

router.delete("/wishlist-movie/:name", async function (req, res, next) {
  var movieFind = await movieModel.deleteOne({
    movieName: req.params.name,
  });
  var result = false;
  if (movieFind.deletedCount == 1) {
    result = true;
  }
  res.json({ reponse: result });
});
// ======================================/read wishlist===============================================

router.get("/wishlist-movie", async function (req, res, next) {
  var wishlistFind = await movieModel.find();

  res.json({ wishlistFind });
});

module.exports = router;
