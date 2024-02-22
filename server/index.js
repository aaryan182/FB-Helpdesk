const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

const connectDB = require("./db");
connectDB();

const app = express();
app.use(cors());
app.use(
    bodyParser.json({
        limit: "50mb",
    })
);

app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        parameterLimit: 100000,
        extended: true,
    })
);

const port = process.env.PORT || 5050;

app.use("/", routes);

app.listen(port, () => console.log(`Server started on port ${port}`));
