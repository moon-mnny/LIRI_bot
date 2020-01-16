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
module.exports = { Band, Movie };
