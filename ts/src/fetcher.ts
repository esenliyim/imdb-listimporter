import axios, { AxiosError, AxiosResponse } from "axios"
import { MatchedUrl, ImdbUrlPattern } from "./types/urlUtils"

const patterns: ImdbUrlPattern[] = [
    {
        listType: "list",
        exp: /^(https:\/\/)?(www.)?imdb.com\/list\/ls\d+\/?$/g
    },
    {
        listType: "watchlist",
        exp: /^(https:\/\/)?(www.)?imdb.com\/user\/ur\d+(\/?(watchlist\/?)?)$/g
    },
]

/**
 * Check if the input URL matches one of the accepted patterns
 * 
 * @param url to be tested
 * @returns a MatchedUrl that only returns false if didn't match, contains true 
 *      and the matched ImdbUrlPattern if did match
 */
const validateUrl = (url: string): MatchedUrl => {
    let matchedUrl: MatchedUrl = {
        matched: false
    }
    patterns.every(pattern => {
        if (url.match(pattern.exp)) {
            matchedUrl = {
                matched: true,
                listType: pattern.listType,
                url: url,
            }
            return false
        }
        return true
    })
    return matchedUrl
}
/**
 * If a URL in the form of user/<id>/watchlist is given, gets the actual watchlist page ID 
 * 
 * @param url the input url
 * @returns a Promise containing the extracted list ID if found and gotten, Promise.reject otherwise
 */
const getListLinkFromWatchlist = async (url: string): Promise<string> => {
    try {
        const startTime = Date.now()
        const response = await axios.get(url)
        const endTime = Date.now()
        console.log(`Execution time: ${endTime - startTime} ms`)
        const searcher = "<meta property=\"pageId\" content=\"" //TODO not found
        let annen: string = response.data
        const index = annen.search(searcher)
        if (index < 0) {
            return Promise.reject("Could not extract list ID")
        }
        const start = index + searcher.length
        const listId = annen.substring(start, annen.indexOf("\"", start))
        if (listId.match(/ls\d+\b/)) {
            return listId
        } else {
            return Promise.reject("Could not extract list ID")
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                return Promise.reject("404 error")
            } else {
                return Promise.reject("Something went wrong")
            }
        } else {
            return Promise.reject("Something went wrong")
        }
    }
}

const makeWatchlistFetchingUrl = (url: string): string => {
    if (url.match(/^ur\d+$/)) {
        return "https://www.imdb.com/user/" + url + "/watchlist"
    }
    if (!url.endsWith("watchlist") && !url.endsWith("watchlist/")) {
        if (!url.endsWith("/")) {
            url += "/"
        }
        return prependHttpsAndWww(url + "watchlist")
    } return url
}

const prependHttpsAndWww = (url: string): string => {
    if (url.startsWith("imdb.com")) {
        url = "https://www." + url
    } else if (url.startsWith("www.")) {
        url = "https://" + url;
    } else if (url.startsWith("https://imdb")) {
        url = url.replace("https://imdb", "https://www.imdb")
    }
    return url
}

/**
 * Creates an export URL out of the input URL
 * 
 * @param url the input URL
 * @returns the export URL to be fetched from
 */
const makeUrl = async (url: string): Promise<string> => {
    url = prependHttpsAndWww(url)
    return url.endsWith("/") ? url + "export" : url + "/export"
}

export const makeRequest = async (url: string): Promise<AxiosResponse> => {
    try {
        const validatedUrl = validateUrl(url)
        if (!validatedUrl.matched) {
            return Promise.reject("Invalid URL")
        }
        if (validatedUrl.listType === "watchlist") {
            const listId = await getListLinkFromWatchlist(makeWatchlistFetchingUrl(validatedUrl.url!))
            url = "https://www.imdb.com/list/" + listId
        }
        const madeUrl = await makeUrl(url)
        return axios.get(madeUrl)
    } catch (error) {
        return Promise.reject(error)
    }
}
export const exportsForTests = {
    validateUrl, getListLinkFromWatchlist, makeUrl, makeWatchlistFetchingUrl
}