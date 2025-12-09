import {convertToJson} from "./utils.mjs";

const baseURL = import.meta.env.VITE_KITSU_SERVER_URL;



export default class AnimeData {

    async getData(
        {   
            pageNumber = 1,
            pageSize = 12, 
            sort = "popularityRank", 
            ageRating = "G,PG", 
            url = "",
            averageRating = "",
            episodeCount = "",
            text = "",

        } = {}
    ) {
        let formattedUrl = "";
        if (url != "") {
            formattedUrl = url;
        } else {
            const averageRatingFilter = averageRating !== "" ? `&filter[averageRating]=${averageRating}` : "";
            const episodeCountFilter = episodeCount !== "" ? `&filter[episodeCount]=${episodeCount}` : "";
            const textFilter = text !== "" ? `&filter[text]=${text}` : "";
            const ageRatingFilter = ageRating !== "" ? `&filter[ageRating]=${ageRating}` : "&filter[ageRating]=G,PG";
            const filters = `${ageRatingFilter}${averageRatingFilter}${episodeCountFilter}${textFilter}`;
            formattedUrl = `${baseURL}/anime?page[size]=${pageSize}&page[number]=${pageNumber}${filters}&sort=${sort}`;
        }
        const response = await fetch(formattedUrl);
        const data = await convertToJson(response);
        return data.data;
    }


    async findById(id) {
        const response = await fetch(`${baseURL}/anime/${id}`);
        const data = await convertToJson(response);
        return data.data;
    }
}