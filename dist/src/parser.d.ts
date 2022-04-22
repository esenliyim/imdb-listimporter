import { Film } from "./types/film";
import { ListVariant } from "./types/listVariant";
import ParserOptions from "./types/parserOptions";
declare const parse: (response: string, options?: ParserOptions) => Film[] | string[][];
export default parse;
export declare const exportsForTests: {
    detectVersion: (header: string[]) => ListVariant | null;
};
