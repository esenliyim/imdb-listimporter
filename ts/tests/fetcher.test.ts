import { exportsForTests } from "../src/fetcher";

const { validateUrl, getListLinkFromWatchlist, makeUrl, makeWatchlistFetchingUrl } = exportsForTests

interface ValidUrl {
    url: string;
    listType: "list" | "watchlist";
    expected: string;
}

const validUrls: ValidUrl[] = [
    {
        url: "https://www.imdb.com/list/ls092123/",
        listType: "list",
        expected: "https://www.imdb.com/list/ls092123/",
    },
    {
        url: "https://www.imdb.com/list/ls092123",
        listType: "list",
        expected: "https://www.imdb.com/list/ls092123",
    },
    {
        url: "www.imdb.com/list/ls092123/",
        listType: "list",
        expected: "https://www.imdb.com/list/ls092123/",
    },
    {
        url: "https://imdb.com/list/ls092123/",
        listType: "list",
        expected: "https://www.imdb.com/list/ls092123/",
    },
    {
        url: "imdb.com/list/ls092123/",
        listType: "list",
        expected: "https://www.imdb.com/list/ls092123/",
    },
    {
        url: "https://www.imdb.com/user/ur115031818/watchlist",
        listType: "watchlist",
        expected: "https://www.imdb.com/user/ur115031818/watchlist",
    },
    {
        url: "https://www.imdb.com/user/ur115031818/watchlist/",
        listType: "watchlist",
        expected: "https://www.imdb.com/user/ur115031818/watchlist/",
    },
    {
        url: "imdb.com/user/ur115031818/watchlist",
        listType: "watchlist",
        expected: "https://www.imdb.com/user/ur115031818/watchlist",
    },
    {
        url: "https://imdb.com/user/ur115031818/watchlist",
        listType: "watchlist",
        expected: "https://www.imdb.com/user/ur115031818/watchlist",
    },
    {
        url: "www.imdb.com/user/ur115031818/watchlist",
        listType: "watchlist",
        expected: "https://www.imdb.com/user/ur115031818/watchlist",
    },
    {
        url: "www.imdb.com/user/ur115031818",
        listType: "watchlist",
        expected: "https://www.imdb.com/user/ur115031818/watchlist",
    },
    {
        url: "www.imdb.com/user/ur115031818/",
        listType: "watchlist",
        expected: "https://www.imdb.com/user/ur115031818/watchlist",
    },
    {
        url: "ur115031818",
        listType: "watchlist",
        expected: "https://www.imdb.com/user/ur115031818/watchlist",
    },
    {
        url: "ls092123",
        listType: "list",
        expected: "https://www.imdb.com/list/ls092123",
    },
]

const expectedListId = "ls092287578";
const expectedListUrl = "https://www.imdb.com/list/ls092287578/export"

describe('testing URL validation', () => {
    test('empty URL should return false', () => {
        expect(validateUrl("")).toStrictEqual({matched: false})
    });
    test('gibberish should return false', () => {
        expect(validateUrl("asdawvsd")).toStrictEqual({matched: false})
        expect(validateUrl("124124124")).toStrictEqual({matched: false})
        expect(validateUrl("https://")).toStrictEqual({matched: false})
        expect(validateUrl("www.")).toStrictEqual({matched: false})
        expect(validateUrl("gib watchlist")).toStrictEqual({matched: false})
    });
    test('invalid IMDb list identifier return false', () => {
        expect(validateUrl("www.imdb.com/list/asd/")).toStrictEqual({matched: false})
        expect(validateUrl("www.imdb.com/list/ls124sa/")).toStrictEqual({matched: false})
        expect(validateUrl("www.imdb.com/list/215")).toStrictEqual({matched: false})
    });
    test('invalid watchlist input return false', () => {
        expect(validateUrl("www.imdb.com/user/watchlist/")).toStrictEqual({matched: false})
        expect(validateUrl("www.imdb.com/user/ur1150318a/watchlist")).toStrictEqual({matched: false})
        expect(validateUrl("www.imdb.com/user/ls1234/watchlist")).toStrictEqual({matched: false})
    });
    test('should accept valid URLs', () => {
        validUrls.forEach(url => {
            expect(validateUrl(url.url)).toStrictEqual({matched: true, listType: url.listType, url: url.expected})
        })
    });
})

describe('testing watchlist URL fetchery', () => {
    test('valid public watchlist link should yield correct ID', async () => {
        const res = await getListLinkFromWatchlist("https://www.imdb.com/user/ur115031818/watchlist")
        expect(res).toStrictEqual(expectedListId)
    });
    test('invalid URL private watchlist should return 404', async () => {
        expect(getListLinkFromWatchlist("https://www.imdb.com/list/ls511803374/watchlist")).rejects.toEqual("404 error")
    });
})

describe('testing usable URL generation', () => {
    test("missing 'export' at the end gets correctly added to list URL", async () => {
        expect(await makeUrl("https://www.imdb.com/list/ls092287578")).toBe(expectedListUrl)
        expect(await makeUrl("https://www.imdb.com/list/ls092287578/")).toBe(expectedListUrl)
    });
})

describe("testing watchlist URL makery", () => {
    test("should make proper URL out of user identifier", () => {
        expect(makeWatchlistFetchingUrl("ur123")).toBe("https://www.imdb.com/user/ur123/watchlist")
    });
    test("should add 'watchlist' at the end", () => {
        expect(makeWatchlistFetchingUrl("https://www.imdb.com/user/ur123")).toBe("https://www.imdb.com/user/ur123/watchlist")
        expect(makeWatchlistFetchingUrl("https://www.imdb.com/user/ur123/")).toBe("https://www.imdb.com/user/ur123/watchlist")
    });
})