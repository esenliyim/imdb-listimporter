import { Film } from "./types/film";
import { ListVariant, PossibleReturns } from "./types/listVariant";
import Variants from "./types/listVariants";
import * as CSV from 'csv-string';
import ParserOptions from "./types/parserOptions";

const detectVersion = (header: string[]): ListVariant | null => {
    const stringifiedHeader = CSV.stringify(header).trim();
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

const parse = (response: string, options: ParserOptions = { marshal: true }): Film[] | string[][] => {
    const records = CSV.parse(response)
    const version = detectVersion(records.shift()!)

    if (version) {
        if (options.marshal) {
            const films: Film[] = []
            records.forEach(record => {
                let film: Film = {}
                version.mapper.forEach((key, index) => {
                    if ((options.only && !options.only.includes(key.localKey)) 
                        || (options.except && options.except.includes(key.localKey))) {
                        return
                    }
                    let value = record[index]
                    film = {
                        ...film,
                        [key.localKey]: key.converter ? key.converter(value) : value
                    }

                })
                films.push(film)
            })
            return films
        } else {
            return records
        }
    } else {
        return []
    }
}

export default parse
export const exportsForTests = {
    detectVersion
}