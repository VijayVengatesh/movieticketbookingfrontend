import { useState } from "react";
import ImageUploader from "./ImageUploader";
import axios from "axios";

function AdminPage() {
  const [movieDetails, setMovieDetails] = useState({
    movieTitle: "",
    movieDirector: "",
    movieCast: "",
    movieDuration: "",
    movieGenre: "",
    movieReleaseDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieDetails({ ...movieDetails, [name]: value });
    console.log(movieDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/admin/addmoviedetails",JSON.stringify(movieDetails))
    .then(response=>{
      console.log(response.josn())
    })
    .catch(error=>{
      console.log(error);
    })
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div className="movies-container">
          <div className="input-container">
            <label htmlFor="movietitle">Movie Title:</label>
            <input
              type="text"
              name="movieTitle"
              id="movietitle"
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="moviedirector">Movie Director:</label>
            <input
              type="text"
              name="movieDirector"
              id="moviedirector"
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="moviecast">Movie Cast</label>
            <input
              type="text"
              name="movieCast"
              id="moviecast"
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="movieduration">Movie Duration:</label>
            <input
              type="text"
              name="movieDuration"
              id="movieduration"
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="moviegenre">Movie Genre:</label>
            <input
              type="text"
              name="movieGenre"
              id="moviegenre"
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="releasedate">Release Date:</label>
            <input
              type="text"
              name="movieReleaseDate"
              id="releasedate"
              onChange={handleChange}
            />
          </div>
          {/* <ImageUploader/> */}
          <div className="btn">
            <button>Insert</button>
          </div>
        </div>
      </form>
    </>
  );
}
export default AdminPage;
