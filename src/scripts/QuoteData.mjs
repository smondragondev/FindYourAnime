import {convertToJson} from "./utils.mjs";

const baseUrl = import.meta.env.VITE_ANIMECHAN_SERVER_URL

export default class QuoteData{

    async getData(){
        const url = `${baseUrl}/quotes/random`;
        const response = await fetch(url);
        const data = await convertToJson(response);
        return data.data;
    }

}