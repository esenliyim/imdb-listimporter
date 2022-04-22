import Variants from "./types/listVariants";
import * as CSV from 'csv-string';
const detectVersion = (header) => {
    const stringifiedHeader = CSV.stringify(header).trim();
    let foundVariant = null;
    Variants.every(variant => {
        const variantHeader = CSV.stringify(variant.header).trim();
        if (stringifiedHeader === variantHeader) {
            foundVariant = variant;
            return false;
        }
        return true;
    });
    return foundVariant;
};
const parse = (response, options = { marshal: true }) => {
    const records = CSV.parse(response);
    const version = detectVersion(records.shift());
    if (version) {
        if (options.marshal) {
            const films = [];
            records.forEach(record => {
                let film = {};
                version.mapper.forEach((key, index) => {
                    if ((options.only && !options.only.includes(key.localKey))
                        || (options.except && options.except.includes(key.localKey))) {
                        return;
                    }
                    let value = record[index];
                    film = {
                        ...film,
                        [key.localKey]: key.converter ? key.converter(value) : value
                    };
                });
                films.push(film);
            });
            return films;
        }
        else {
            return records;
        }
    }
    else {
        return [];
    }
};
export default parse;
export const exportsForTests = {
    detectVersion
};
