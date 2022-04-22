export declare type Film = {
    id?: string;
    created?: Date;
    modified?: Date | null;
    description?: string | null;
    title?: string;
    url?: string;
    titleType?: string;
    rating?: number | null;
    runtime?: number;
    year?: number | null;
    genres?: string[];
    numVotes?: number;
    releaseDate?: number;
    directors?: string[];
    rated?: number;
    order?: number;
    dateRated?: Date;
};
export declare enum Keys {
    ID = "id",
    CREATED = "created",
    MODIFIED = "modified",
    DESCRIPTION = "description",
    TITLE = "title",
    URL = "url",
    TITLE_TYPE = "titleType",
    RATING = "rating",
    RUNTIME = "runtime",
    YEAR = "year",
    GENRES = "genres",
    NUM_VOTES = "numVotes",
    RELEASE_DATE = "releaseDate",
    DIRECTORS = "directors",
    YOUR_RATING = "rated",
    POSITION = "order",
    DATE_RATED = "dateRated"
}
