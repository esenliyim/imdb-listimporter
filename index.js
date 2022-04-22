"use strict";
exports.__esModule = true;
var fetcher_1 = require("./src/fetcher");
var parser_1 = require("./src/parser");
// axios.get(url)
//     .then(resp => {
//         const data = resp.data
//         const rawArr = CSV.parse(data)
//         films = parse(rawArr)
//         console.log(films)
//     })
//     .catch(err => {
//         console.log(err)
//     })
(0, fetcher_1.makeRequest)("https://www.imdb.com/user/ur115031818/watchlist")
    .then(function (resp) {
    console.log("asd");
    console.log((0, parser_1["default"])(resp.data));
})["catch"](function (err) {
});
