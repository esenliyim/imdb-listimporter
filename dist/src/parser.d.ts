import { Film } from "./types/film";
import { ListVariant } from "./types/listVariant";
declare const parse: (response: string) => Film[];
export default parse;
export declare const exportsForTests: {
    detectVersion: (header: string[]) => ListVariant | null;
};
