import { makeRequest } from "./fetcher";
import parse from "./parser";
import { Film } from "./types/film"
import ParserOptions from "./types/parserOptions";

const importList = async (url: string, options: ParserOptions = {marshal: true}): Promise<Film[] | string[][]> => {
    try {
        const response = await makeRequest(url)
        return parse(response.data, options)
    } catch (error) {
        return Promise.reject(error)
    }
}

export default importList