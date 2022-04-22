import { Keys } from "./film";

export interface ListVariant {
    header: string[];
    version: string;
    mapper: KeyMap[];
}

export type PossibleReturns = number | Date | string[] | null

interface KeyMap {
    localKey: Keys;
    converter?: (input: string) => PossibleReturns;
}