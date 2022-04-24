import axios, { AxiosError } from "axios"
import { MatchedUrl, ImdbUrlPattern } from "./types/urlUtils.js"
import { DOMParser } from '@xmldom/xmldom'

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
        const extractionResults = extractListId(response.data)
        if (!extractionResults[0]) {
            return Promise.reject(extractionResults[1]);
        } else {
            if (extractionResults[1].match(/ls\d+\b/)) {
                return extractionResults[1]
            } else {
                return Promise.reject("Could not extract a valid listId")
            }
        }
    } catch (error) {
        const err = error as Error | AxiosError
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 404) {
                return Promise.reject("404 error")
            }
            return Promise.reject("Something went wrong: " + err.message)
        } else {
            return Promise.reject("Something went wrong: " + err.message)
        }
    }
}

const extractListId = (data: string): [boolean, string] => {
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(data, 'text/html');
    if (!checkIfPublic(doc)) {
        return [false, "watchlist is private"]
    }
    const metas = doc.getElementsByTagName('meta')
    for (let i = 0; i < metas.length; i++) {
        const meta = metas[i]
        if (meta.attributes.item(0)!.nodeValue !== "pageId") {
            continue
        } else {
            return [true, meta.attributes.item(1)!.textContent!]
        }
    }
    return [false, "could not extract listID"]
}

const checkIfPublic = (doc: Document): boolean => {
    return doc.getElementById("unavailable") ? false : true
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
const makeUrl = (url: string): string => {
    return url.endsWith("/") ? url + "export" : url + "/export"
}

export const makeRequest = async (url: string): Promise<string> => {
    try {
        const validatedUrl = validateUrl(url)
        if (!validatedUrl.matched) {
            return Promise.reject("Invalid URL")
        }
        if (validatedUrl.listType === "watchlist") {
            const listId = await getListLinkFromWatchlist(validatedUrl.url!)
            validatedUrl.url = "https://www.imdb.com/list/" + listId
        }
        const madeUrl = makeUrl(validatedUrl.url!)
        console.log(madeUrl)
        const resp = await axios.get(madeUrl)
        return resp.data
    } catch (error) {
        const err = error as Error | AxiosError
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 403) {
                return Promise.reject("list is private");
            }
            return Promise.reject("got error code " + err.response?.status + " while trying to fetch list");
        }
        return Promise.reject(error)
    }
}

// module.exports.default = makeRequest
export default makeRequest

/**
 * exports for testing purposes, not meant to be used externally. Ugly hack but alas...
 */
export const exportsForTests = {
    validateUrl, getListLinkFromWatchlist, makeUrl, makeWatchlistFetchingUrl, extractListId
}