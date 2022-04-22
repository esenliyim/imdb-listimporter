import { makeRequest } from "./fetcher";
import parse from "./parser";
import { Film } from "./types/film"

const importList = async (url: string): Promise<Film[]> => {
    try {
        const response = await makeRequest(url)
        return parse(response.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export default importList