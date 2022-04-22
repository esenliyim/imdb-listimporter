import { Film } from "./film";
declare type ParserOptions = {
    marshal?: boolean;
    only?: (keyof Film)[];
    except?: (keyof Film)[];
};
export default ParserOptions;
