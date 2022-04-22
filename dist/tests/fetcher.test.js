import { exportsForTests } from "../src/fetcher";
const { validateUrl, getListLinkFromWatchlist, makeUrl } = exportsForTests;
const validUrls = [
    {
        url: "https://www.imdb.com/list/ls092123/",
        listType: "list"
    },
    {
        url: "https://www.imdb.com/list/ls092123",
        listType: "list"
    },
    {
        url: "www.imdb.com/list/ls092123/",
        listType: "list"
    },
    {
        url: "https://imdb.com/list/ls092123/",
        listType: "list"
    },
    {
        url: "imdb.com/list/ls092123/",
        listType: "list"
    },
    {
        url: "https://www.imdb.com/user/ur115031818/watchlist",
        listType: "watchlist"
    },
    {
        url: "https://www.imdb.com/user/ur115031818/watchlist/",
        listType: "watchlist"
    },
    {
        url: "imdb.com/user/ur115031818/watchlist",
        listType: "watchlist"
    },
    {
        url: "https://imdb.com/user/ur115031818/watchlist",
        listType: "watchlist"
    },
    {
        url: "www.imdb.com/user/ur115031818/watchlist",
        listType: "watchlist"
    },
    {
        url: "www.imdb.com/user/ur115031818",
        listType: "watchlist"
    },
    {
        url: "www.imdb.com/user/ur115031818/",
        listType: "watchlist"
    },
];
const expectedListId = "ls092287578";
const expectedListUrl = "https://www.imdb.com/list/ls092287578/export";
describe('testing URL validation', () => {
    test('empty URL should return false', () => {
        expect(validateUrl("")).toStrictEqual({ matched: false });
    });
    test('gibberish should return false', () => {
        expect(validateUrl("asdawvsd")).toStrictEqual({ matched: false });
        expect(validateUrl("124124124")).toStrictEqual({ matched: false });
        expect(validateUrl("https://")).toStrictEqual({ matched: false });
        expect(validateUrl("www.")).toStrictEqual({ matched: false });
        expect(validateUrl("gib watchlist")).toStrictEqual({ matched: false });
    });
    test('invalid IMDb list identifier return false', () => {
        expect(validateUrl("www.imdb.com/list/asd/")).toStrictEqual({ matched: false });
        expect(validateUrl("www.imdb.com/list/ls124sa/")).toStrictEqual({ matched: false });
        expect(validateUrl("www.imdb.com/list/215")).toStrictEqual({ matched: false });
    });
    test('invalid watchlist input return false', () => {
        expect(validateUrl("www.imdb.com/user/watchlist/")).toStrictEqual({ matched: false });
        expect(validateUrl("www.imdb.com/user/ur1150318a/watchlist")).toStrictEqual({ matched: false });
        expect(validateUrl("www.imdb.com/user/ls1234/watchlist")).toStrictEqual({ matched: false });
    });
    test('should accept valid URLs', () => {
        validUrls.forEach(url => {
            expect(validateUrl(url.url)).toStrictEqual({ matched: true, listType: url.listType });
        });
    });
});
describe('testing watchlist URL fetchery', () => {
    test('valid public watchlist link should yield correct ID', async () => {
        const res = await getListLinkFromWatchlist("https://www.imdb.com/user/ur115031818/watchlist");
        expect(res).toStrictEqual(expectedListId);
    });
    test('invalid URL private watchlist should return 404', async () => {
        expect(getListLinkFromWatchlist("https://www.imdb.com/list/ls511803374/watchlist")).rejects.toEqual("404 error");
    });
});
describe('testing usable URL generation', () => {
    test("missing 'export' at the end gets correctly added to list URL", async () => {
        expect(await makeUrl("https://www.imdb.com/list/ls092287578")).toBe(expectedListUrl);
        expect(await makeUrl("https://www.imdb.com/list/ls092287578/")).toBe(expectedListUrl);
    });
    test("missing https and www get added", async () => {
        expect(await makeUrl("imdb.com/list/ls092287578")).toBe(expectedListUrl);
        expect(await makeUrl("https://imdb.com/list/ls092287578/")).toBe(expectedListUrl);
        expect(await makeUrl("www.imdb.com/list/ls092287578/")).toBe(expectedListUrl);
    });
    jest.setTimeout(10000); // FIXME mock this
    test("get the correct URL from user profile URL without watchlist prefix", async () => {
        expect(await makeUrl("www.imdb.com/user/ur115031818")).toBe(expectedListUrl);
        expect(await makeUrl("www.imdb.com/user/ur115031818/")).toBe(expectedListUrl);
    });
    test("get the correct URL from user profile URL", async () => {
        expect(await makeUrl("www.imdb.com/user/ur115031818/watchlist")).toBe(expectedListUrl);
        expect(await makeUrl("www.imdb.com/user/ur115031818/watchlist/")).toBe(expectedListUrl);
    });
});
