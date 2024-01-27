const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    try {
        res.sendFile(index.html);
    } catch (error) {
        console.error("$There was an error:", error.message);
        res.status(500).send("error 500")
    }
});
//Get all Movies
app.get("/movies", async (req, res) => {
    try {
        let response = await axios.get(`https://ablabb2webb.azurewebsites.net/movies`);

        res.json(response.data);
    } catch (error) {
        res.status(500).send(`Could not find any movies`);
    }
});

//Get Movie by Id
app.get("/movie/:id", async (req, res) => {
    try {
        let movieToDisplay = parseInt(req.params.id);
        let response = await axios.get(`https://ablabb2webb.azurewebsites.net/movie/${movieToDisplay}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Could not find the movie");
    }
});

//Add a new movie
app.post("/movie", async (req, res) => {
    try {
        let newMovie = req.body;
        let response = await axios.post(`https://ablabb2webb.azurewebsites.net/movie`, newMovie);
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Could not add the new book");
    }
});

//Update a movie by Id

app.put("/movie/:id", async (req, res) => {
    try {
        let movieToUpdate = parseInt(req.params.id);
        let updateData = req.body;
        let response = await axios.put(`https://ablabb2webb.azurewebsites.net/movie/${movieToUpdate}`, updateData);
        res.json({updatedTitle: updateData.title, updatedDirector: updateData.director });
    } catch (error) {
        res.status(500).send("Could not update the movie");
    }
});

//Delete a movie by Id
app.delete("/movie/:id", async (req, res) => {
    try {
        let movieToUpdate = parseInt(req.params.id);
        let response = await axios.delete(`https://ablabb2webb.azurewebsites.net/movie/${movieToUpdate}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Could not delete the movie");
    }
});

app.listen(PORT, () => {
    console.log("Listening to port: " + PORT);
});