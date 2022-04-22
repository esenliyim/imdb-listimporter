type ListTypes = "list" | "watchlist";

export interface MatchedUrl {
    matched: boolean;
    listType?: ListTypes;
    url?: string
}

export interface ImdbUrlPattern {
    listType: ListTypes;
    exp: RegExp;
    converter: (input: string) => string 
}