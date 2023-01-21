const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");
const app = express();
app.use(express.json());
const db_path = path.join(__dirname, "moviesData.db");
let db = null;
const initializer = async () => {
  try {
    db = await open({
      filename: db_path,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Is Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`Db Error ${e.message}`);
    process.exit(1);
  }
};
initializer();
//GET Names API
app.get("/movies/", async (request, response) => {
  const getNameQuary = `
      SELECT 
       movie_name
       FROM 
       movie;
    `;
  const nameArray = await db.all(getNameQuary);
  response.send(nameArray);
});

//GET about Specific Movie
app.get("/movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;
  const getMovieQuary = `
  SELECT *
  FROM 
  movie 
  WHERE movie_id=${movieId};  
  `;
  const result = await db.get(getMovieQuary);
  response.send(result);
});

module.exports = app;
