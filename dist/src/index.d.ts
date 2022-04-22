import { Film } from "./types/film";
import ParserOptions from "./types/parserOptions";
declare const importList: (url: string, options?: ParserOptions) => Promise<Film[] | string[][]>;
export default importList;
