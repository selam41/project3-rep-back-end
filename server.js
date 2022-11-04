require('dotenv').config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");

db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.options('*', cors())

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
require("./app/routes/course.routes.js")(app);
require("./app/routes/section.routes")(app);
require("./app/routes/semester.routes")(app);
require("./app/routes/faculity.routes")(app);
require("./app/routes/room.routes")(app);
require("./app/routes/section_times.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

require("./app/routes/special_list.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
