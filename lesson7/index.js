const http = require("http");
const fs = require("fs");
const port = 3000;
const hostname = '127.0.0.1';




const handleFile = (statusCode, fileName, req, res) => {

    fs.readFile(fileName, "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.writeHead(statusCode, { "Content-Type": "text/html" });
            res.write(data);
            res.end();

        }


    })

}



const myserver = http.createServer((req, res) => {


    if (req.url === "/") {
        handleFile(200, "./view/index.html", req, res);

    }

    else if (req.url === "/about") {
        handleFile(200, "./view/about.html", req, res);

    }


    else if (req.url === "/contact") {
        handleFile(200, "./view/contact.html", req, res);
    }


    else {
        handleFile(200, "./views/error.html", req, res);

    }






})

myserver.listen(port, hostname, () => {
    console.log(`server is running successfully at http://${hostname}:${port}`);
})