import { getParam, loadHeaderFooter } from "./utils.mjs";
import AnimeData from "./AnimeData.mjs";
import AnimeDetail from "./AnimeDetail.mjs";
import AnimeFavorite from "./AnimeFavorite.mjs";
import AnimeFavoriteData from "./AnimeFavoriteData.mjs";

await loadHeaderFooter();

const animeID = getParam("anime");
const animeData = new AnimeData();
const mainContainer = document.querySelector("main");
const loadingIndicator = document.querySelector("#loading-indicator");
const animeDetail = new AnimeDetail(animeID,mainContainer,animeData,loadingIndicator);
await animeDetail.init();

const animeFavoriteData = new AnimeFavoriteData();
const animeFavorite = new AnimeFavorite("",animeFavoriteData);
animeFavorite.init();

const addFavoriteButton = document.querySelector("#add-favorite");
addFavoriteButton.addEventListener("click", () => {
    const animeItem = animeDetail.getAnime();
    animeFavorite.add(animeItem);
});