import Variants from "./types/listVariants";
import * as CSV from 'csv-string';
const detectVersion = (header) => {
    const stringifiedHeader = CSV.stringify(header).trim();
    console.log(stringifiedHeader);
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
const parse = (response) => {
    const records = CSV.parse(response);
    const films = [];
    const variant = detectVersion(records.shift());
    if (variant) {
        records.forEach(record => {
            let film = {};
            variant.mapper.forEach((key, index) => {
                let value = record[index];
                film = {
                    ...film,
                    [key.localKey]: key.converter ? key.converter(value) : value
                };
            });
            films.push(film);
        });
    }
    return films;
};
export default parse;
export const exportsForTests = {
    detectVersion
};
