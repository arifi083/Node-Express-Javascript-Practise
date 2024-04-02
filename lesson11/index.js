const express = require("express");
const app = express();
const PORT = 3000;



const myMiddleWare = (req, res, next) => {
    console.log("Middleware function");

    req.currentTime = new Date(Date.now());
    next();
};

app.use(myMiddleWare);


app.use((req, res, next) => {
    res.send("404 bad url request");
});

app.use((err, req, res, next) => {
    res.status(500).send("Something broke!");
});

app.get("/", (req, res) => {
    console.log("I am home. " + req.currentTime);
    res.send("Hello I am home route");
});


app.get("/about", (req, res) => {
    console.log("I am home. " + req.currentTime);
    res.send("Hello I am about route");
});



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});