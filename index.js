var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.json({ status: "success", message: "Welcome To Testing API" });
    });

app.listen(port, () => console.log('Example app listening on port ' + port))