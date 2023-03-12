const express = require("express");
const router = express.Router();
const app = express();
const {Restaurant} = require("../models/index");
const {sequelize} = require("../db");
const {check, validationResult} = require("express-validator");
app.use(express.json());





router.get("/", async (request, response) => {
    const getRestaurants = await Restaurant.findAll();
    response.json(getRestaurants);

})

router.get("/:id", async (request, response) => {
const restaurant = await Restaurant.findByPk(request.params.id);
response.json(restaurant);
})


router.post("/", [check("name").not().isEmpty().trim(), check("location").not().isEmpty().trim(), check("cuisine").not().isEmpty().trim()], async (req, res) => {
const newName = req.body.name;
const newLocation = req.body.location;
const newCuisine = req.body.cuisine;

const errors = validationResult(req);

if(!errors.isEmpty()){
    res.json({error: errors.array()});
} else {

const newRestaurant = await Restaurant.create({name: newName, location: newLocation, cuisine: newCuisine});
res.json(newRestaurant);
}
})

router.put("/:id", async (req, res) => {

const id = req.params.id
const updatedName = req.body.name;
const updatedLocation = req.body.location;
const updatedCuisine = req.body.cuisine;
const foundRestaurant = await Restaurant.findByPk(id);

const updatedRestaurant = await foundRestaurant.update({
    name: updatedName,location: updatedLocation, cuisine: updatedCuisine});

res.json(updatedRestaurant);

});


router.delete("/:id", async (req, res) => {
const id = req.params.id
const restaurantRow = await Restaurant.findByPk(id);
const deletedRestaurants = await restaurantRow.destroy()
const foundRestaurant = await Restaurant.findByPk(id);
res.json(deletedRestaurants);

})


module.exports = router;