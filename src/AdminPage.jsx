


import { useState } from "react";

function AdminPage() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [data, setData] = useState({
        valTitle: "",
        valDirector: "",
        valCast: "",
        valDuration:"",
        valGenre:"",
        valReleaseDate:"",
        valMovieImg:""
    });
    const dataGiven = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
        console.log(name,value)
    }
    const submitProduct = () => {
        const movieDetails = {
          movieTitle: data.valTitle,
          movieDirector: data.valDirector,
          movieCast: data.valCast,
          movieDuration: data.valDuration,
          movieGenre:data.valGenre,
          movieReleaseDate:data.valReleaseDate,
          movieImg:data.valMovieImg
        }
        console.log("data",data);
        console.log("moviedetails",movieDetails)
        fetch("http://localhost:8080/admin/addmoviedetails", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(movieDetails)
        }).then(response => {
            return response.json();
        })
        .then(data=>{
          console.log(data);
        })

    }
    const handleFile = () => {
        const formData = new FormData();
        formData.append("file", selectedImage);
    
        fetch("http://localhost:8080/file/upload", {
            method: 'POST',
            body: formData,
            dataType: "jsonp"
        })
        .then(response => response.text())
        .then(text => {
            data.valMovieImg = text
            console.log(text)
        })
      }
    return (
        <div>
            <div className="ad">
                <h1 className="text-center">Add a Movie Details</h1>
                <div className="pr"><label>Movie Title:</label> <input type="text" name="valTitle" onChange={dataGiven} /></div> <br></br>
                <div className="pr"><label>Movie Director :</label> <input type="text" name="valDirector" onChange={dataGiven} /></div> <br></br>
                <div className="pr"><label>Movie Cast:</label> <input type="text" name="valCast" onChange={dataGiven}  /></div> <br></br>
                <div className="pr"><label>Movie Duration:</label> <input type="text" name="valDuration" onChange={dataGiven}  /></div> <br></br>
                <div className="pr"><label>Movie Genre:</label> <input type="text" name="valGenre" onChange={dataGiven}  /></div> <br></br>
                <div className="pr"><label>Movie ReleaseDate:</label><input type="text" name="valReleaseDate"  onChange={dataGiven} /></div> <br></br>
                <div className="pr">
                    <div>
                        {selectedImage && (
                            <div className="text-center">
                                <img
                                    alt="not found"
                                    width={"200px"}
                                    height={"270px"}
                                    src={URL.createObjectURL(selectedImage)}
                                />
                                <br />
                                <button  onClick={() => setSelectedImage(null)}>Remove</button>&nbsp;&nbsp;
                                <button  onClick={handleFile}>Upload</button>
                            </div>
                        )}
                        <br />
                        <br />

                        <input
                            type="file"
                            name="myImage"
                            value={data.valImage}
                            onChange={(event) => {
                                console.log(event.target.files[0]);
                                setSelectedImage(event.target.files[0]);
                            }}
                        />
                    </div>
                </div>
                {/* <input type="button" value="Add Product"  /> */}
                <div className="text-center"><button  onClick={submitProduct}>Add Product</button></div>
            </div>
        </div>
    );
}

export default AdminPage;