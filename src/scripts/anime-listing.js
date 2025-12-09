import loadHeaderFooter from "./loadHeaderFooter.mjs";
import AnimeData from "./AnimeData.mjs";
import AnimeList from "./AnimeList.mjs";

await loadHeaderFooter();
const filteredAnime = document.querySelector("#filtered-anime");
const animeData = new AnimeData();
const animeList = new AnimeList(filteredAnime, animeData);
animeList.setupInfiniteScroll();

let filters = {};
let searchTimeout;
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", () => {
    const value = searchInput.value.trim();
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        if (value.length !== 0) {
            filters = { ...filters, text: value }
            animeList.setupFilters(filters);
            animeList.setupInfiniteScroll();
        }
    }, 300);
});

const avgRatingInputs = document.querySelectorAll("input[name='average-rating']");
avgRatingInputs.forEach((avgRating) => {
    avgRating.addEventListener("change", () => {
        const value = avgRating.value;
        filters = {...filters, averageRating: value};
        animeList.setupFilters(filters);
        animeList.setupInfiniteScroll();
    });
}); 

const numberEpisodesInputs = document.querySelectorAll("input[name='number-episodes']");
numberEpisodesInputs.forEach((numberEpisode) => {
    numberEpisode.addEventListener("change", () => {
        const value = numberEpisode.value;
        filters = {...filters, episodeCount: value};
        animeList.setupFilters(filters);
        animeList.setupInfiniteScroll();
    });
});


const ageRatingFilters = [];
const ageRatingInputs = document.querySelectorAll("input[name='age-rating']");
ageRatingInputs.forEach((ageRating) => {
    ageRating.addEventListener("change", () => {
        const checked = ageRating.checked;
        const value = ageRating.value;
        if (checked){
            ageRatingFilters.push(value);
        } else {
            ageRatingFilters.pop(value);
        }

        const ageRatingStr = ageRatingFilters.join(",");
        filters = {...filters, ageRating: ageRatingStr};
        animeList.setupFilters(filters);
        animeList.setupInfiniteScroll();
    });
});