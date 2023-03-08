const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3001;
app.use(express.json())

sequelize.sync();


app.get("/restaurants", async (request, response) => {
        const getRestaurants = await Restaurant.findAll();
        response.json(getRestaurants);

})

app.get("/restaurants/:id", async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id);
    response.json(restaurant);
})


app.post("/restaurants", async (req, res) => {
    const newName = req.body.name;
    const newLocation = req.body.location;
    const newCuisine = req.body.cuisine;

    const newRestaurant = await Restaurant.create({name: newName, location: newLocation, cuisine: newCuisine});
    res.json(newRestaurant);
})

app.put("/restaurants/:id", async (req, res) => {

    const id = req.params.id
    const updatedName = req.body.name;
    const updatedLocation = req.body.location;
    const updatedCuisine = req.body.cuisine;
    const foundRestaurant = await Restaurant.findByPk(id);

    const updatedRestaurant = await foundRestaurant.update({
        name: updatedName,location: updatedLocation, cuisine: updatedCuisine});

    res.json(updatedRestaurant);
   
});


app.delete("/restaurants/:id", async (req, res) => {
    const id = req.params.id
    const restaurantRow = await Restaurant.findByPk(id);
    const deletedRestaurants = await restaurantRow.destroy()
    const foundRestaurant = await Restaurant.findByPk(id);
    res.json(deletedRestaurants);

})


app.listen(port, () => {
    
    console.log(`Your server is listening on port http://localhost:${port}/restaurants`);
})

