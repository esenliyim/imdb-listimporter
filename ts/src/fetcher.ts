import axios, { AxiosError, AxiosResponse } from "axios"
import { MatchedUrl, ImdbUrlPattern } from "./types/urlUtils"

const patterns: ImdbUrlPattern[] = [
    {
        listType: "list",
        exp: /^(https:\/\/)?(www.)?imdb.com\/list\/ls\d+\/?$/g,
        converter: (input: string): string => {
            return prependHttpsAndWww(input)
        }
    },
    {
        listType: "watchlist",
        exp: /^(https:\/\/)?(www.)?imdb.com\/user\/ur\d+(\/?(watchlist\/?)?)$/g,
        converter: (input: string): string => {
            return prependHttpsAndWww(makeWatchlistFetchingUrl(input))
        }
    },
    {
        listType: "watchlist",
        exp: /^ur\d+$/g,
        converter: (input: string): string => {
            return prependHttpsAndWww(makeWatchlistFetchingUrl(input))
        }
    },
    {
        listType: "list",
        exp: /^ls\d+$/g,
        converter: (input: string): string => {
            return "https://www.imdb.com/list/" + input
        }
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
                url: pattern.converter(url),
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
        const response = await axios.get(url)
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

/**
 * Generate a URL to be used for fetching the list ID
 * 
 * @param input either a user ID, a URL leading to the user profile, or to the <profile>/watchlist route 
 * @returns a fully formed URL that leads to the <profile>/watchlist route
 */
const makeWatchlistFetchingUrl = (input: string): string => {
    if (input.match(/^ur\d+$/)) {
        return "https://www.imdb.com/user/" + input + "/watchlist"
    }
    if (!input.endsWith("watchlist") && !input.endsWith("watchlist/")) {
        if (!input.endsWith("/")) {
            input += "/"
        }
        return prependHttpsAndWww(input + "watchlist")
    } 
    return input
}

/**
 * Makes sure the URL starts with 'https://www.'
 * 
 * @param url a URL that may or may not be missing https and/or www at the beginning
 * @returns a URL that definitely is not missing https and/or www at the beginning
 */
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
    // url = prependHttpsAndWww(url)
    return url.endsWith("/") ? url + "export" : url + "/export"
}

export const makeRequest = async (url: string): Promise<AxiosResponse> => {
    try {
        const validatedUrl = validateUrl(url)
        if (!validatedUrl.matched) {
            return Promise.reject("Invalid URL")
        }
        if (validatedUrl.listType === "watchlist") {
            const listId = await getListLinkFromWatchlist(validatedUrl.url!)
            validatedUrl.url = "https://www.imdb.com/list/" + listId
        } 
        const madeUrl = await makeUrl(validatedUrl.url!)
        return axios.get(madeUrl)
    } catch (error) {
        return Promise.reject(error)
    }
}

/**
 * exports for testing purposes, not meant to be used externally. Ugly hack but alas...
 */
export const exportsForTests = {
    validateUrl, getListLinkFromWatchlist, makeUrl, makeWatchlistFetchingUrl
}