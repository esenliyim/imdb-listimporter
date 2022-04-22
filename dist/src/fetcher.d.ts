import { AxiosResponse } from "axios";
import { MatchedUrl } from "./types/urlUtils";
export declare const makeRequest: (url: string) => Promise<AxiosResponse>;
export declare const exportsForTests: {
    validateUrl: (url: string) => MatchedUrl;
    getListLinkFromWatchlist: (url: string) => Promise<string>;
    makeUrl: (url: string) => Promise<string>;
    makeWatchlistFetchingUrl: (url: string) => string;
    prependHttpsAndWww: (url: string) => string;
};
