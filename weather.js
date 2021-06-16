const axios= require('axios');





class Forecast {

    constructor(object){
      this.description=`the lowest temp : ${object.low_temp} and the  highest temp is ${object.max_temp} with a ${object.weather.description} `;
      this.date= object.valid_date;
  
    }
  }


  function getWeather (req,res){
    // let latreq=req.query.lat;
    // let lonreq=req.query.lon;
    let searchQueryreq=req.query.searchQuery;
    const KEY=process.env.WEATHER_API_KEY;
    let url=`https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQueryreq}&key=${KEY}`;
    axios.get(url).then(apiResults=>{
      const forecasts = apiResults.data.data.map(item => {
        { return new Forecast(item);}
      });
      res.send(forecasts);
  
  
    });
  }



  module.exports = getWeather;