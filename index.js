var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.json({ status: "success", message: "Welcome To Testing API" });
    });

app.listen(port, () => console.log('Example app listening on port ' + port))