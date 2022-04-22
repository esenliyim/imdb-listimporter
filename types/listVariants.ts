import { ListVariant } from "./listVariant"
import { Keys } from "./film";
import * as CSV from 'csv-string';
import { Z_ASCII } from "zlib";

const toDate = (input: string): Date => {
    return new Date(input);
}

const toDirectorsArray = (input: string): string[] | null => {
    if (input === "") {
        return null
    } else {
        return CSV.parse(input)[0]
    }
}

const toGenresArray = (input: string): string[] | null => {
    if (input === "") {
        return null
    } else {
        return CSV.parse(input)[0]
    }
}

const toImdbRating = (input: string): number | null => {
    if (input === "" ) {
        return null
    } else {
        return parseFloat(input)
    }
}

const Variants: ListVariant[] = [
    {
        header: ['position', 'const', 'created', 'modified', 'description', 'Title', 'Title type', 'Directors', 'You rated', 'IMDb Rating', 'Runtime (mins)', 'Year', 'Genres', 'Num. Votes', 'Release Date (month/day/year)', 'URL'],
        version: 1,
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
        version: 2,
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
        version: 3,
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
        header: ['Position','Const','Created','Modified','Description','Title','URL','Title Type','IMDb Rating','Runtime (mins)','Year','Genres','Num Votes','Release Date','Directors'],
        version: 4,
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
]

export default Variants