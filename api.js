require("dotenv").config();
// var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify({
  id: "dd5ffea8c8bc40749b13ec76abd7f9a4",
  secret: "df3e7ac8d14f4ccdaf308ba9e6573bd8"
});

var axios = require("axios");
function Band() {
  this.Base_Url = "https://rest.bandsintown.com/artists/";
  this.App_Id = "/events?app_id=codingbootcamp";
}
Band.prototype.concertThis = function(artist) {
  return axios.get(`${this.Base_Url}${artist}${this.App_Id}`);
};
function Movie() {
  this.Base_Url = "http://www.omdbapi.com/?apikey=trilogy&t=";
}
Movie.prototype.movieThis = function(title) {
  return axios.get(`${this.Base_Url}${title}`);
};

function Song() {
  this.Base_Url = "https://api.spotify.com/v1/search?q=";
}
Song.prototype.spotifyThisSong = function(song) {
  var qSong = song.split(" ").join("%20");
  return spotify.request(`${this.Base_Url}${qSong}&limit=1&type=track`);
};
module.exports = { Band, Movie, Song };
