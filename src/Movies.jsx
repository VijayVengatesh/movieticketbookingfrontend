import axios from "axios";
import { useEffect, useState } from "react";

function Movies() {
  const [movieDetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const[imgSrc,setImgSrc]=useState('');
  function pageLoading() {
    setLoading(false);
    try {
      if (movieDetails == null) {
        setLoading(true);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    pageLoading();
    axios
      .get("http://localhost:8080/admin/getmoviesdetails")
      .then((response) => {
        // console.log(response.data)
        setMovieDetails(response.data);
      });
  }, []);
  console.log("moviedetails:", movieDetails);
  return (
    <>
      {loading && <p>loading</p>}

      {movieDetails.map((movie,index)=>(
        <div className="card" key={index}>
          <div className="card-body">
            {movie.movieImg}
            {movie.movieTitle} <br />
            {movie.movieDirector} <br />
            {movie.movieCast} <br />
            {movie.movieDuration} <br />
            {movie.movieGenre} <br />
          </div>
        </div>
      ))}
    </>
  );
}
export default Movies;
