const fs = require('fs')
//console.log(fs);

// fs.appendFile('demo.txt', "i wants to add something this file", function (err) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("successful")
//     }

// })




// fs.readFile('demo.txt', "utf-8", (err, data) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(data)
//     }

// })



// fs.rename('demo.txt', 'demo1.txt', (err) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("successfull")
//     }

// })


// fs.unlink('demo1.txt', (err) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("successfull")
//     }

// })


fs.exists('demo1.txt', (result) => {
    if (result) {
        console.log("found");
    }
    else {
        console.log("not found")
    }

})