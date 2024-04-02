const http = require("http");
const fs = require("fs");
const port = 3000;
const hostname = '127.0.0.1';

const myserver = http.createServer((req, res) => {

    /*
    if (req.url === "/") {
        fs.readFile("./view/index.html", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();

        })
    }

    else if (req.url === "/about") {
        fs.readFile("./view/about.html", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();

        })
    }


    else if (req.url === "/contact") {
        fs.readFile("./view/contact.html", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();

        })
    }


    else {
        console.log(req.url);

        fs.readFile("./view/erro.html", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();

        })
    }

  */

    const handleFile = (statusCode, fileLocation) => {

        fs.readFile(fileLocation, (err, data) => {
            res.writeHead(statusCode, { "Content-Type": "text/html" });
            res.write(data);
            res.end();

        })

    }


    if (req.url === "/") {
        handleFile(200, "./view/index.html");

    }

    else if (req.url === "/about") {
        handleFile(200, "./view/about.html");

    }


    else if (req.url === "/contact") {
        handleFile(200, "./view/contact.html");
    }


    else {
        handleFile(200, "./views/error.html");

    }






})

myserver.listen(port, hostname, () => {
    console.log(`server is running successfully at http://${hostname}:${port}`);
})