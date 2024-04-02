const express = require("express");
const app = express();
const userRouter = require('./routes/user.route');



app.use("/api/user", userRouter);


app.use("/home", (req, res) => {
    res.statusCode = 200;
    res.sendFile(__dirname + "/views/index.html");
})


app.use("/reg", (req, res) => {
    // res.status(200).json({
    //     "name": "anisul islam",
    //     "message": "i am come from reg page",
    //     statusCode: 200
    // })

    res.statusCode = 200;
    res.sendFile(__dirname + "/views/register.html");

})

app.get("/login", (req, res) => {
    res.cookie("name", "rabeya");
    res.cookie("age", "30");
    // res.clearCookie("name");
    // res.append("id", "130000");
    // res.end();
});



app.use((req, res) => {
    res.send("<h1>404 !!! not found</h1>")
})



module.exports = app