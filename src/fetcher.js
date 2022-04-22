"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.makeRequest = exports.validateUrl = void 0;
var axios_1 = require("axios");
// const URL_PATTERN: RegExp = /^(https:\/\/)?(www.)?imdb.com\/((list\/ls\d+)|(user\/ur\d+\/watchlist))\b/g
var patterns = [
    {
        listType: "list",
        exp: /^(https:\/\/)?(www.)?imdb.com\/list\/ls\d+\b/g
    },
    {
        listType: "watchlist",
        exp: /^(https:\/\/)?(www.)?imdb.com\/user\/ur\d+\/watchlist\b/g
    },
];
/**
 * Check if the input URL is valid
 *
 * @param url to be tested
 * @returns true if URL is valid, false otherwise
 */
var validateUrl = function (url) {
    var matchedUrl = {
        matched: false
    };
    patterns.every(function (pattern) {
        if (url.match(pattern.exp)) {
            matchedUrl = {
                matched: true,
                listType: pattern.listType
            };
            return false;
        }
        return true;
    });
    return matchedUrl;
};
exports.validateUrl = validateUrl;
var getListLinkFromWatchlist = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var response, searcher, annen, index, start, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].get(url)];
            case 1:
                response = _a.sent();
                searcher = "<meta property=\"pageId\" content=\"";
                annen = response.data;
                index = annen.search(searcher);
                start = index + searcher.length;
                return [2 /*return*/, annen.substring(start, annen.indexOf("\"", start))];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, Promise.reject("went wrong dunno")];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * Creates an export URL out of the input URL
 *
 * @param url the input URL
 * @returns the export URL to be fetched from
 */
var makeUrl = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var validatedUrl, listId, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                validatedUrl = (0, exports.validateUrl)(url);
                console.log(validatedUrl);
                if (!validatedUrl.matched) {
                    return [2 /*return*/, {
                            validUrl: false
                        }];
                }
                if (!(validatedUrl.listType === "watchlist")) return [3 /*break*/, 2];
                return [4 /*yield*/, getListLinkFromWatchlist(url)];
            case 1:
                listId = _a.sent();
                url = "https://www.imdb.com/list/" + listId;
                _a.label = 2;
            case 2:
                if (!url.startsWith("https://")) {
                    if (!url.startsWith("www.")) {
                        url = "www." + url;
                    }
                    url = "https://" + url;
                }
                result = url.endsWith("/") ? url + "export" : url + "/export";
                return [2 /*return*/, {
                        validUrl: true,
                        fetchUrl: result
                    }];
        }
    });
}); };
var makeRequest = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var madeUrl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, makeUrl(url)];
            case 1:
                madeUrl = _a.sent();
                if (madeUrl.validUrl) {
                    return [2 /*return*/, axios_1["default"].get(madeUrl.fetchUrl)];
                }
                else {
                    return [2 /*return*/, Promise.reject("Invalid URL")];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.makeRequest = makeRequest;
