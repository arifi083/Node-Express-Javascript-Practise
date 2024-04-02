const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
app.get("/", (req, res) => {
    const id = req.query.id;
    const name = req.query.name;
    res.send(`<h1>Student name is: ${name} and id is: ${id}</h1>`)
})

*/

app.get("/userId/:id/userAge/:age", (req, res) => {
    const id = req.params.id;
    const age = req.params.age;

    res.send(`<h1>Student id is: ${id} and age is: ${age}</h1>`)
})


app.post("/user", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    res.send(`<h2>Your name is ${name} and age is ${age}</h2>`);
})


app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})


app.post("/register", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    res.send(`<h2>Your name is ${name} and age is ${age}</h2>`);
})




app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
