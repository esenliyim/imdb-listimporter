import { makeRequest } from "./fetcher";
import parse from "./parser";
const importList = async (url, options = { marshal: true }) => {
    try {
        const response = await makeRequest(url);
        return parse(response.data, options);
    }
    catch (error) {
        return Promise.reject(error);
    }
};
export default importList;
