import { exportsForTests } from "./dist/src/fetcher.js"
const { getListLinkFromWatchlist, makeUrl, validateUrl, makeWatchlistFetchingUrl } = exportsForTests

console.log(makeWatchlistFetchingUrl("www.imdb.com/user/ur115031818/watchlist/"))