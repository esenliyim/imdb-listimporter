import { Film } from "./types/film";
declare const importList: (url: string) => Promise<Film[]>;
export default importList;
