const http = require("http");
const port = 3000;
const hostname = '127.0.0.1';

const myserver = http.createServer((req, res) => {
    res.writeHead(202, { 'Content-Type': 'text-html' })
    res.write("<h1>Hello node js</h1>");
    res.end();
})

myserver.listen(port, hostname, () => {
    console.log(`server is running successfully at http://${hostname}:${port}`);
})