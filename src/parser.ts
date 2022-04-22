import { Film } from "../types/film";
import { ListVariant, PossibleReturns } from "../types/listVariant";
import Variants from "../types/listVariants";
import * as CSV from 'csv-string';

const detectVersion = (header: string[]): ListVariant | null => {
    const stringifiedHeader = CSV.stringify(header).trim();
    console.log(stringifiedHeader)
    let foundVariant = null;
    Variants.every(variant => {
        const variantHeader = CSV.stringify(variant.header).trim()
        if (stringifiedHeader === variantHeader) {
            foundVariant = variant;
            return false;
        }
        return true;
    })
    return foundVariant;
}

const parse = (response: string): Film[] => {
    const records = CSV.parse(response)
    const films: Film[] = [];
    const variant = detectVersion(records.shift()!)
    
    if (variant) {
        records.forEach(record => {
            let film: Film = {}
            variant.mapper.forEach((key, index) => {
                let value = record[index]
                film = {
                    ...film,
                    [key.localKey]: key.converter ? key.converter(value) : value
                }
            })
            films.push(film)
        })
    }
    return films;
}

export default parse