'use strict';
const express= require('express');
const server=express();
const weatherData=require('./data/weather.json');
const cors = require('cors');
server.use(cors());




const PORT=1996;



class Forecast {

  constructor(object){
    this.description=`the lowest temp : ${object.low_temp} and the  highest temp is ${object.max_temp} with a ${object.weather.description} `;
    this.date= object.valid_date;

  }
};

let arr=weatherData;
delete arr.data;

server.listen(PORT,()=>{
  console.log(`im using port ${PORT}`);
});

// localhost:1996/weather?lat=123&?lon=123&?searchQuery=cityNmae
server.get('/weather',(req,res)=>{
  let latreq=req.query.lat;
  let lonreq=req.query.lon;
  let searchQueryreq=req.query.searchQuery;
  let weatherItem= weatherData.find(item=>{
    if((item.lat==latreq&&item.lon==lonreq)||(item.city_name==searchQueryreq))
    return item;

  });

  try{
    let forecasts = weatherItem.data.map(item => {

       { return new Forecast(item);}
    });
    res.send(forecasts);
  }
  catch
   {
    res.status(404).send('OPS!! Your City Not Found');
  }

    


});


server.get('*',(req,res) =>{
  res.status(404).send('sorry, this page not found');
});
