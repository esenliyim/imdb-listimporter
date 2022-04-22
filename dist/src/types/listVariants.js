import { Keys } from "./film";
import * as CSV from 'csv-string';
const toDate = (input) => {
    return new Date(input);
};
const toDirectorsArray = (input) => {
    if (input === "") {
        return null;
    }
    else {
        return CSV.parse(input)[0];
    }
};
const toGenresArray = (input) => {
    if (input === "") {
        return null;
    }
    else {
        return CSV.parse(input)[0];
    }
};
const toImdbRating = (input) => {
    if (input === "") {
        return null;
    }
    else {
        return parseFloat(input);
    }
};
const Variants = [
    {
        header: ['position', 'const', 'created', 'modified', 'description', 'Title', 'Title type', 'Directors', 'You rated', 'IMDb Rating', 'Runtime (mins)', 'Year', 'Genres', 'Num. Votes', 'Release Date (month/day/year)', 'URL'],
        version: "imdb_v1",
        mapper: [
            {
                localKey: Keys.POSITION,
            },
            {
                localKey: Keys.ID,
            },
            {
                localKey: Keys.CREATED,
                converter: toDate
            },
            {
                localKey: Keys.MODIFIED,
                converter: toDate
            },
            {
                localKey: Keys.DESCRIPTION,
            },
            {
                localKey: Keys.TITLE,
            },
            {
                localKey: Keys.TITLE_TYPE,
            },
            {
                localKey: Keys.DIRECTORS,
                converter: toDirectorsArray
            },
            {
                localKey: Keys.YOUR_RATING,
                converter: parseInt
            },
            {
                localKey: Keys.RATING,
                converter: parseFloat
            },
            {
                localKey: Keys.RUNTIME,
                converter: parseInt
            },
            {
                localKey: Keys.YEAR,
                converter: parseInt
            },
            {
                localKey: Keys.GENRES,
                converter: toGenresArray
            },
            {
                localKey: Keys.NUM_VOTES,
                converter: parseInt
            },
            {
                localKey: Keys.RELEASE_DATE,
                converter: toDate
            },
            {
                localKey: Keys.URL,
            },
        ]
    },
    {
        header: ['Const', 'Your Rating', 'Date Added', 'Title', 'Title Type', 'Directors', 'IMDb Rating', 'Runtime (mins)', 'Year', 'Genres', 'Num Votes'],
        version: "imdb_v2",
        mapper: [
            {
                localKey: Keys.ID
            },
            {
                localKey: Keys.YOUR_RATING,
                converter: parseInt
            },
            {
                localKey: Keys.CREATED,
                converter: toDate
            },
            {
                localKey: Keys.TITLE
            },
            {
                localKey: Keys.TITLE_TYPE
            },
            {
                localKey: Keys.DIRECTORS,
                converter: toDirectorsArray
            },
            {
                localKey: Keys.RATING,
                converter: parseFloat
            },
            {
                localKey: Keys.RUNTIME,
                converter: parseInt
            },
            {
                localKey: Keys.GENRES,
                converter: toGenresArray
            },
            {
                localKey: Keys.NUM_VOTES,
                converter: parseInt
            },
        ]
    },
    {
        header: ['Position', 'Const', 'Created', 'Modified', 'Description', 'Title', 'URL', 'Title Type', 'IMDb Rating', 'Runtime (mins)', 'Year', 'Genres', 'Num Votes', 'Release Date', 'Directors', 'Your Rating', 'Date Rated'],
        version: "imdb_v3",
        mapper: [
            {
                localKey: Keys.POSITION,
                converter: parseInt,
            },
            {
                localKey: Keys.ID,
            },
            {
                localKey: Keys.CREATED,
                converter: toDate,
            },
            {
                localKey: Keys.MODIFIED,
                converter: toDate,
            },
            {
                localKey: Keys.DESCRIPTION,
            },
            {
                localKey: Keys.TITLE,
            },
            {
                localKey: Keys.URL,
            },
            {
                localKey: Keys.TITLE_TYPE,
            },
            {
                localKey: Keys.RATING,
                converter: parseFloat,
            },
            {
                localKey: Keys.RUNTIME,
                converter: parseInt,
            },
            {
                localKey: Keys.YEAR,
                converter: parseInt,
            },
            {
                localKey: Keys.GENRES,
                converter: toGenresArray,
            },
            {
                localKey: Keys.NUM_VOTES,
                converter: parseInt,
            },
            {
                localKey: Keys.RELEASE_DATE,
                converter: toDate,
            },
            {
                localKey: Keys.DIRECTORS,
                converter: toDirectorsArray,
            },
            {
                localKey: Keys.YOUR_RATING,
                converter: parseInt,
            },
            {
                localKey: Keys.DATE_RATED,
                converter: toDate,
            },
        ]
    },
    {
        header: ['Position', 'Const', 'Created', 'Modified', 'Description', 'Title', 'URL', 'Title Type', 'IMDb Rating', 'Runtime (mins)', 'Year', 'Genres', 'Num Votes', 'Release Date', 'Directors'],
        version: "imdb_v4",
        mapper: [
            {
                localKey: Keys.POSITION,
                converter: parseInt
            },
            {
                localKey: Keys.ID,
            },
            {
                localKey: Keys.CREATED,
                converter: toDate
            },
            {
                localKey: Keys.MODIFIED,
                converter: toDate
            },
            {
                localKey: Keys.DESCRIPTION,
            },
            {
                localKey: Keys.TITLE,
            },
            {
                localKey: Keys.URL,
            },
            {
                localKey: Keys.TITLE_TYPE,
            },
            {
                localKey: Keys.RATING,
                converter: parseFloat
            },
            {
                localKey: Keys.RUNTIME,
                converter: parseInt
            },
            {
                localKey: Keys.YEAR,
                converter: parseInt
            },
            {
                localKey: Keys.GENRES,
                converter: toGenresArray
            },
            {
                localKey: Keys.NUM_VOTES,
                converter: parseInt
            },
            {
                localKey: Keys.RELEASE_DATE,
                converter: toDate
            },
            {
                localKey: Keys.DIRECTORS,
                converter: toDirectorsArray
            },
        ]
    }
];
export default Variants;
