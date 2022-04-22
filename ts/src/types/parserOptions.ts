import { Film } from "./film";

type ParserOptions = {
    marshal?: boolean;
    only?: (keyof Film)[];
    except?: (keyof Film)[];
}

export default ParserOptions