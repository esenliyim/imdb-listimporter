"use strict";
exports.__esModule = true;
var film_1 = require("./film");
var CSV = require("csv-string");
var toDate = function (input) {
    return new Date(input);
};
var toDirectorsArray = function (input) {
    if (input === "") {
        return null;
    }
    else {
        return CSV.parse(input)[0];
    }
};
var toGenresArray = function (input) {
    if (input === "") {
        return null;
    }
    else {
        return CSV.parse(input)[0];
    }
};
var toImdbRating = function (input) {
    if (input === "") {
        return null;
    }
    else {
        return parseFloat(input);
    }
};
var Variants = [
    {
        header: ['position', 'const', 'created', 'modified', 'description', 'Title', 'Title type', 'Directors', 'You rated', 'IMDb Rating', 'Runtime (mins)', 'Year', 'Genres', 'Num. Votes', 'Release Date (month/day/year)', 'URL'],
        version: 1,
        mapper: [
            {
                localKey: film_1.Keys.POSITION
            },
            {
                localKey: film_1.Keys.ID
            },
            {
                localKey: film_1.Keys.CREATED,
                converter: toDate
            },
            {
                localKey: film_1.Keys.MODIFIED,
                converter: toDate
            },
            {
                localKey: film_1.Keys.DESCRIPTION
            },
            {
                localKey: film_1.Keys.TITLE
            },
            {
                localKey: film_1.Keys.TITLE_TYPE
            },
            {
                localKey: film_1.Keys.DIRECTORS,
                converter: toDirectorsArray
            },
            {
                localKey: film_1.Keys.YOUR_RATING,
                converter: parseInt
            },
            {
                localKey: film_1.Keys.RATING,
                converter: parseFloat
            },
            {
                localKey: film_1.Keys.RUNTIME,
                converter: parseInt
            },
            {
                localKey: film_1.Keys.YEAR,
                converter: parseInt
            },
            {
                localKey: film_1.Keys.GENRES,
                converter: toGenresArray
            },
            {
                localKey: film_1.Keys.NUM_VOTES,
                converter: parseInt
            },
            {
                localKey: film_1.Keys.RELEASE_DATE,
                converter: toDate
            },
            {
                localKey: film_1.Keys.URL
            },
        ]
    },
    {
        header: ['Const', 'Your Rating', 'Date Added', 'Title', 'Title Type', 'Directors', 'IMDb Rating', 'Runtime (mins)', 'Year', 'Genres', 'Num Votes'],
        version: 2,
        mapper: [
            {
                localKey: film_1.Keys.ID
            },
            {
                localKey: film_1.Keys.YOUR_RATING,
                converter: parseInt
            },
            {
                localKey: film_1.Keys.CREATED,
                converter: toDate
            },
            {
                localKey: film_1.Keys.TITLE
            },
            {
                localKey: film_1.Keys.TITLE_TYPE
            },
            {
                localKey: film_1.Keys.DIRECTORS,
                converter: toDirectorsArray
            },
            {
                localKey: film_1.Keys.RATING,
                converter: parseFloat
            },
            {
                localKey: film_1.Keys.RUNTIME,
                converter: parseInt
            },
            {
                localKey: film_1.Keys.GENRES,
                converter: toGenresArray
            },
            {
                localKey: film_1.Keys.NUM_VOTES,
                converter: parseInt
            },
        ]
    },
    {
        header: ['Position', 'Const', 'Created', 'Modified', 'Description', 'Title', 'URL', 'Title Type', 'IMDb Rating', 'Runtime (mins)', 'Year', 'Genres', 'Num Votes', 'Release Date', 'Directors', 'Your Rating', 'Date Rated'],
        version: 3,
        mapper: [
            {
                localKey: film_1.Keys.POSITION,
                converter: parseInt
            },
            {
                localKey: film_1.Keys.ID
            },
            {
                localKey: film_1.Keys.CREATED,
                converter: toDate
            },
            {
                localKey: film_1.Keys.MODIFIED,
                converter: toDate
            },
            {
                localKey: film_1.Keys.DESCRIPTION
            },
            {
                localKey: film_1.Keys.TITLE
            },
            {
                localKey: film_1.Keys.URL
            },
            {
                localKey: film_1.Keys.TITLE_TYPE
            },
            {
                localKey: film_1.Keys.RATING,
                converter: parseFloat
            },
            {
                localKey: film_1.Keys.RUNTIME,
                converter: parseInt
            },
            {
                localKey: film_1.Keys.YEAR,
                converter: parseInt
            },
            {
                localKey: film_1.Keys.GENRES,
                converter: toGenresArray
            },
            {
                localKey: film_1.Keys.NUM_VOTES,
                converter: parseInt
            },
            {
                localKey: film_1.Keys.RELEASE_DATE,
                converter: toDate
            },
            {
                localKey: film_1.Keys.DIRECTORS,
                converter: toDirectorsArray
            },
            {
                localKey: film_1.Keys.YOUR_RATING,
                converter: parseInt
            },
            {
                localKey: film_1.Keys.DATE_RATED,
                converter: toDate
            },
        ]
    },
    {
        header: ['Position', 'Const', 'Created', 'Modified', 'Description', 'Title', 'URL', 'Title Type', 'IMDb Rating', 'Runtime (mins)', 'Year', 'Genres', 'Num Votes', 'Release Date', 'Directors'],
        version: 4,
        mapper: [
            {
                localKey: film_1.Keys.POSITION,
                converter: parseInt
            },
            {
                localKey: film_1.Keys.ID
            },
            {
                localKey: film_1.Keys.CREATED,
                converter: toDate
            },
            {
                localKey: film_1.Keys.MODIFIED,
                converter: toDate
            },
            {
                localKey: film_1.Keys.DESCRIPTION
            },
            {
                localKey: film_1.Keys.TITLE
            },
            {
                localKey: film_1.Keys.URL
            },
            {
                localKey: film_1.Keys.TITLE_TYPE
            },
            {
                localKey: film_1.Keys.RATING,
                converter: parseFloat
            },
            {
                localKey: film_1.Keys.RUNTIME,
                converter: parseInt
            },
            {
                localKey: film_1.Keys.YEAR,
                converter: parseInt
            },
            {
                localKey: film_1.Keys.GENRES,
                converter: toGenresArray
            },
            {
                localKey: film_1.Keys.NUM_VOTES,
                converter: parseInt
            },
            {
                localKey: film_1.Keys.RELEASE_DATE,
                converter: toDate
            },
            {
                localKey: film_1.Keys.DIRECTORS,
                converter: toDirectorsArray
            },
        ]
    }
];
exports["default"] = Variants;
