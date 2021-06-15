'use strict';
const express= require('express');
const server=express();

const cors = require('cors');
const { default: axios } = require('axios');
require('dotenv').config();
server.use(cors());




const PORT=process.env.PORT;



class Forecast {

  constructor(object){
    this.description=`the lowest temp : ${object.low_temp} and the  highest temp is ${object.max_temp} with a ${object.weather.description} `;
    this.date= object.valid_date;

  }
}

class Movies {
  constructor(object){

    this.title=object.title;
    this.overview=object.overview;
    this.average_votes=object.vote_average;
    this.total_votes=object.vote_count;
    this.image_url=`https://image.tmdb.org/t/p/w500${object.poster_path}`;
    this.popularity=object.popularity;
    this.released_on=object.release_date;
  }


}



server.listen(1996,()=>{
  console.log(`im using port ${PORT}`);
});

// localhost:1996/weather?lat=123&?lon=123&?searchQuery=cityNmae
server.get('/weather', getWeather);
server.get('/movies',getMovie);

function getWeather (req,res){
  // let latreq=req.query.lat;
  // let lonreq=req.query.lon;
  let searchQueryreq=req.query.searchQuery;
  let KEY=process.env.WEATHER_API_KEY;
  let url=`https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQueryreq}&key=${KEY}`;
  axios.get(url).then(apiResults=>{
    const forecasts = apiResults.data.data.map(item => {
      { return new Forecast(item);}
    });
    res.send(forecasts);


  });
}


function getMovie(req,res){
  let searchQueryreq=req.query.searchQuery;
  let KEY=process.env.MOVIE_API_KEY;
  let url=`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query==${searchQueryreq}`;
  axios.get(url).then(apiResults=>{
    const movInfo= apiResults.data.results.map(item =>{
      {return new Movies(item);}
    });
    res.send(movInfo);

  })
    .catch(err =>{
      res.send(`there is an error in getting the data => ${err}`);});


}




server.get('*',(req,res) =>{
  res.status(500).send('sorry, this page not found');
});
