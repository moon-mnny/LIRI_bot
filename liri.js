// require("dotenv").config();
// var keys = require("./keys.js");
// var Spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);
var fs = require("fs");
const { Band, Movie } = require("./api");
var bandAPI = new Band();
var movieAPI = new Movie();

var command = process.argv[2];
var userQuery = process.argv.slice(3).join(" ");
switch (command) {
  case "concert-this":
    console.log(
      `\n---------------------------------------\nArtist : ${userQuery}\n---------------------------------------`
    );
    bandAPI.concertThis(userQuery).then(function(res) {
      var venue = res.data[0].venue;
      var d = new Date(`${res.data[0].datetime}`);
      var n = d.toLocaleDateString();
      console.log(
        `Name of the venue : ${venue.name}\n\nVenue location : ${venue.city}, ${venue.country}\n\nDate of the Event : ${n}\n`
      );
    });
    break;
  case "spotify-this-song":
    console.log(`Song you asked for : ${userQuery}`);
    // spotify
    //   .search({ type: "track", query: `${userQuery}` })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err + "unable to search"));
    break;
  case "movie-this":
    console.log(
      `\n---------------------------------------\nMovie : ${userQuery}\n---------------------------------------`
    );
    movieAPI.movieThis(userQuery).then(function(res) {
      var movieLog = `Title : ${res.data.Title}\n\nYear : ${res.data.Year}\n\n${res.data.Ratings[0].Source} : ${res.data.Ratings[0].Value}\n\n${res.data.Ratings[1].Source} : ${res.data.Ratings[1].Value}\n\nCountry : ${res.data.Country} Language : ${res.data.Language}\n\nActors : ${res.data.Actors}\n\nPlot : ${res.data.Plot}\n\n`;
      fs.appendFile("log.txt", `${movieLog}`, err => {
        if (err) throw err;
        console.log(`${movieLog} append success`);

        // console.log(
        //   `Title : ${res.data.Title}\n\nYear : ${res.data.Year}\n\n${res.data.Ratings[0].Source} : ${res.data.Ratings[0].Value}\n\n${res.data.Ratings[1].Source} : ${res.data.Ratings[1].Value}\n\nCountry : ${res.data.Country} Language : ${res.data.Language}\n\nActors : ${res.data.Actors}\n\nPlot : ${res.data.Plot}\n\n`
        // )
      });
    });
    break;
  case "do-what-it-says":
    fs.readFile("random.txt", "utf8", function(err, data) {
      if (err) throw err;
      var txtData = data.split(",");
      command = txtData[0];
      userQuery = txtData[1];
    });
  default:
    console.log("Unsupported command");
}
