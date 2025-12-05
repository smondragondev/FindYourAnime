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

    async getData({pageNumber = 1, pageSize = 12,sort = "popularityRank", url = ""} = {}) {
        let formattedUrl = "";
        if (url != ""){
            formattedUrl = url;
        }else{
            formattedUrl = `${baseURL}/anime?page[size]=${pageSize}&page[number]=${pageNumber}&filter[ageRating]=G,PG&sort=${sort}`;
        }
        const response = await fetch(formattedUrl);
        const data = await convertToJson(response);
        return data.data;
    }

    async findById(id) {
        const response = await fetch(`${baseURL}anime/${id}`);
        const data = await convertToJson(response);
        return data.Result;
    }
}