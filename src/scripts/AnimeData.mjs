const baseURL = import.meta.env.VITE_KITSU_SERVER_URL;

function convertToJson(res) {
    const dataJson = res.json();
    if (res.ok) {
        return dataJson;
    } else {
        const jsonReponse = JSON.stringify(dataJson);
        throw { name: "servicesError", message: jsonReponse };
    }
}

export default class AnimeData {

    async getData() {
        const url = `${baseURL}/anime?page[size]=12`;
        const response = await fetch(url);
        const data = await convertToJson(response);
        return data.data;
    }

    async findById(id) {
        const response = await fetch(`${baseURL}anime/${id}`);
        const data = await convertToJson(response);
        return data.Result;
    }
}