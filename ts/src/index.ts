import makeRequest from "./fetcher.js";
import parse from "./parser.js";
import {Film} from "./types/film.js"
import ParserOptions from "./types/parserOptions.js";

/**
 * 
 * @param input Can be 
 * (1) a URL to a non-watchlist list on IMDb -> imdb.com/list/ls**
 * (2) a URL to a user profile -> imdb.com/user/ur**
 * (3) a URL to the 'watchlist as a watchlist' -> imdb.user/<ur**>/watchlist 
 * (4) an IMDb user ID -> ur**
 * (5) an IMDb list ID -> ls**
 * @param options 
 * marshal: boolean -> true returns Film[], false returns string[][]
 * only: string[] -> useless without 'marshal' set to true, only returns the specified fields
 * exclude: string[] -> useless without 'marshal' set to true, returns everything but the specified fields
 * @returns array of Film objects if marshal set to true, string[][] otherwise
 */
const importList = async (input: string, options: ParserOptions = { marshal: true }): Promise<Film[] | string[][]> => {
    try {
        const response = await makeRequest(input)
        return parse(response, options)
    } catch (error) {
        return Promise.reject(error)
    }
}

export default importList