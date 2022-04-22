import { exportsForTests } from "../src/parser";
import Variants from "../src/types/listVariants";
import * as CSV from "csv-string";
import fs from "fs";
import parse from "../src/parser";
import { Keys } from "../src/types/film";
const { detectVersion } = exportsForTests;
describe("testing variant recognition", () => {
    const currentPath = process.cwd();
    test("should recognize v1", () => {
        try {
            const data = fs.readFileSync(currentPath + "/ts/tests/data/" + Variants[0].version + ".csv", 'utf-8');
            expect(detectVersion(CSV.parse(data).shift())).toStrictEqual(Variants[0]);
        }
        catch (error) {
            throw error;
        }
    });
    test("should recognize v2", () => {
        try {
            const data = fs.readFileSync(currentPath + "/ts/tests/data/" + Variants[1].version + ".csv", 'utf-8');
            expect(detectVersion(CSV.parse(data).shift())).toStrictEqual(Variants[1]);
        }
        catch (error) {
            throw error;
        }
    });
    test("should recognize v3", () => {
        try {
            const data = fs.readFileSync(currentPath + "/ts/tests/data/" + Variants[2].version + ".csv", 'utf-8');
            expect(detectVersion(CSV.parse(data).shift())).toStrictEqual(Variants[2]);
        }
        catch (error) {
            throw error;
        }
    });
});
describe("testing variant rejection", () => {
    test("should reject empty array", () => {
        expect(detectVersion([])).toBe(null);
    });
    test("should reject empty array", () => {
        expect(detectVersion(["asd", "ifhjas"])).toBe(null);
    });
    test("should reject incorrect array", () => {
        expect(detectVersion(['Position', 'Const', 'Created', 'Modified', 'Description', 'Title', 'URL', 'Title Type', 'IMDb Rating', 'Runtime (mins)', 'Year', 'Genres', 'Num Votes'])).toBe(null);
    });
    test("should reject incorrect array", () => {
        expect(detectVersion([...Variants[0].header, "asdasd"])).toBe(null);
    });
});
describe("testing key specification", () => {
    const currentPath = process.cwd();
    test("should only have title and ID", async () => {
        try {
            const data = fs.readFileSync(currentPath + "/ts/tests/data/" + Variants[2].version + ".csv", 'utf-8');
            const parsed = await parse(data, { marshal: true, only: [Keys.TITLE, Keys.ID] });
            const difference = Object.keys(parsed[0]).filter(x => ![Keys.TITLE, Keys.ID].includes(x));
            expect(difference).toStrictEqual([]);
        }
        catch (error) {
            throw error;
        }
    });
    test("should exclude title and ID", async () => {
        try {
            const data = fs.readFileSync(currentPath + "/ts/tests/data/" + Variants[2].version + ".csv", 'utf-8');
            const toExclude = [Keys.TITLE, Keys.ID];
            const parsed = await parse(data, { marshal: true, except: toExclude });
            const difference = Object.values(Keys).filter(x => ![Keys.TITLE, Keys.ID].includes(x));
            toExclude.forEach(key => {
                expect(Object.keys(parsed[0]).includes(key)).toBe(false);
            });
            difference.forEach(key => {
                expect(Object.keys(parsed[0]).includes(key)).toBe(true);
            });
        }
        catch (error) {
            throw error;
        }
    });
});
// TODO marshalling tests
