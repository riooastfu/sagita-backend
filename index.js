const express = require('express');
const path = require("path");
const cors = require('cors')
const routes = require('./routes');
const bodyParser = require("body-parser");
const app = express();

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(routes);
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.listen(3000,() => console.log('Server is running on port 3000'));