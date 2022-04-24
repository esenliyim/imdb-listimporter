import { Film } from "./film.js";

type ParserOptions = {
    marshal?: boolean;
    only?: (keyof Film)[];
    except?: (keyof Film)[];
}

export default ParserOptions