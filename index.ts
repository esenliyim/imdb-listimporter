import axios from "axios";
import { makeRequest } from "./src/fetcher";
import parse from "./src/parser";

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

makeRequest("https://www.imdb.com/user/ur115031818/watchlist")
    .then(resp => {
        console.log("asd")
        console.log(parse(resp.data))
    })
    .catch(err => {

    })