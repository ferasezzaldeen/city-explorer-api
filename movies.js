const axios= require('axios');


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
  


  function getMovie(req,res){
    let searchQueryreq=req.query.searchQuery;
    const KEY=process.env.MOVIE_API_KEY;
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
  
module.exports=getMovie;  