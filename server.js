const express = require("express");
const app = express();
const router = express.Router();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3002;
app.use(express.json())

sequelize.sync();

const restaurantRouter = require("./routes/restaurants");
app.use("/restaurants", restaurantRouter);




app.listen(port, () => {
    
    console.log(`Your server is listening on port http://localhost:${port}/restaurants`);
})

