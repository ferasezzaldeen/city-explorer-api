'use strict';
require('dotenv').config();
const express= require('express');
const cors = require('cors');
const axios= require('axios');
const server=express();
server.use(cors());
const PORT=process.env.PORT || 1996;

const getWeather=require ('./weather');
const getMovie=require('./movies')



server.listen(PORT,()=>{
  console.log(`im using port ${PORT}`);
});

// localhost:1996/weather?lat=123&?lon=123&?searchQuery=cityNmae
server.get('/weather', getWeather);
server.get('/movies',getMovie);
server.get('*',(req,res) =>{
  res.status(500).send('sorry, this page not found');
});
