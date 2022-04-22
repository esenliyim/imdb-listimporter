import axios, { AxiosResponse } from "axios"

// const URL_PATTERN: RegExp = /^(https:\/\/)?(www.)?imdb.com\/((list\/ls\d+)|(user\/ur\d+\/watchlist))\b/g

const patterns: ImdbUrlPattern[] = [
    {
        listType: "list",
        exp: /^(https:\/\/)?(www.)?imdb.com\/list\/ls\d+\b/g
    },
    {
        listType: "watchlist",
        exp: /^(https:\/\/)?(www.)?imdb.com\/user\/ur\d+\/watchlist\b/g
    },
]

interface UrlMakerResult {
    validUrl: boolean;
    fetchUrl?: string;
}

type ListTypes = "list" | "watchlist";

interface MatchedUrl {
    matched: boolean;
    listType?: ListTypes;
}

interface ImdbUrlPattern {
    listType: ListTypes;
    exp: RegExp;
}

/**
 * Check if the input URL is valid
 * 
 * @param url to be tested
 * @returns true if URL is valid, false otherwise
 */
export const validateUrl = (url: string): MatchedUrl => {
    let matchedUrl: MatchedUrl = {
        matched: false
    }
    patterns.every(pattern => {
        if (url.match(pattern.exp)) {
            matchedUrl = {
                matched: true,
                listType: pattern.listType
            }
            return false
        }
        return true
    })
    return matchedUrl
}

const getListLinkFromWatchlist = async (url: string): Promise<string> => {
    try {
        const response = await axios.get(url)
        const searcher = "<meta property=\"pageId\" content=\""
        let annen: string = response.data
        const index = annen.search(searcher)
        const start = index + searcher.length
        return annen.substring(start, annen.indexOf("\"", start))
    } catch (error) {
        return Promise.reject("went wrong dunno")
    }
}

/**
 * Creates an export URL out of the input URL
 * 
 * @param url the input URL
 * @returns the export URL to be fetched from
 */
const makeUrl = async (url: string): Promise<UrlMakerResult> => {
    const validatedUrl = validateUrl(url)
    console.log(validatedUrl)
    if (!validatedUrl.matched) {
        return {
            validUrl: false
        }
    }
    if (validatedUrl.listType === "watchlist") {
        const listId = await getListLinkFromWatchlist(url)
        url = "https://www.imdb.com/list/" + listId
    }
    if (!url.startsWith("https://")) {
        if (!url.startsWith("www.")) {
            url = "www." + url;
        }
        url = "https://" + url;
    }
    const result = url.endsWith("/") ? url + "export" : url + "/export"
    return {
        validUrl: true,
        fetchUrl: result
    }
}

export const makeRequest = async (url: string): Promise<AxiosResponse> => {
    const madeUrl = await makeUrl(url)
    if (madeUrl.validUrl) {
        return axios.get(madeUrl.fetchUrl!)
    } else {
        return Promise.reject("Invalid URL")
    }
}