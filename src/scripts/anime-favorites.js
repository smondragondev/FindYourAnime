import loadHeaderFooter from "./loadHeaderFooter.mjs";
import AnimeFavorite from "./AnimeFavorite.mjs";
import AnimeFavoriteData from "./AnimeFavoriteData.mjs";

await loadHeaderFooter();

const animeFavoritesList = document.querySelector("#anime-favorites");
const animeFavoriteData = new AnimeFavoriteData();
const animeFavorite = new AnimeFavorite(animeFavoritesList,animeFavoriteData);
animeFavorite.init();