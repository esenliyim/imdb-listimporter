import { Film } from "./types/film";
import { ListVariant, PossibleReturns } from "./types/listVariant";
import Variants from "./types/listVariants";
import * as CSV from 'csv-string';
import ParserOptions from "./types/parserOptions";

/**
 * Detects which IMDb export template is being used
 * 
 * @param header the header line of the input data
 * @returns the detected variant or null
 */
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

/**
 * Parses the input string into either an array of Film or a 2D array of strings
 * 
 * @param input a string that must be a valid CSV
 * @param options parsing options
 * @returns either an array of Film or a 2D array of strings
 */
const parse = (input: string, options: ParserOptions = { marshal: true }): Film[] | string[][] => {
    const records = CSV.parse(input)
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