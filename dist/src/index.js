import { makeRequest } from "./fetcher";
import parse from "./parser";
const importList = async (url) => {
    try {
        const response = await makeRequest(url);
        return parse(response.data);
    }
    catch (error) {
        return Promise.reject(error);
    }
};
export default importList;
