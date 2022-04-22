"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var listVariants_1 = require("../types/listVariants");
var CSV = require("csv-string");
var detectVersion = function (header) {
    var stringifiedHeader = CSV.stringify(header).trim();
    console.log(stringifiedHeader);
    var foundVariant = null;
    listVariants_1["default"].every(function (variant) {
        var variantHeader = CSV.stringify(variant.header).trim();
        if (stringifiedHeader === variantHeader) {
            foundVariant = variant;
            return false;
        }
        return true;
    });
    return foundVariant;
};
var parse = function (response) {
    var records = CSV.parse(response);
    var films = [];
    var variant = detectVersion(records.shift());
    if (variant) {
        records.forEach(function (record) {
            var film = {};
            variant.mapper.forEach(function (key, index) {
                var _a;
                var value = record[index];
                film = __assign(__assign({}, film), (_a = {}, _a[key.localKey] = key.converter ? key.converter(value) : value, _a));
            });
            films.push(film);
        });
    }
    return films;
};
exports["default"] = parse;
