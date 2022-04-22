import { Keys } from "./film";
export interface ListVariant {
    header: string[];
    version: number;
    mapper: KeyMap[];
}
export declare type PossibleReturns = number | Date | string[] | null;
interface KeyMap {
    localKey: Keys;
    converter?: (input: string) => PossibleReturns;
}
export {};
