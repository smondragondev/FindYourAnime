import { getParam, loadHeaderFooter } from "./utils.mjs";
import AnimeData from "./AnimeData.mjs";
import AnimeDetail from "./AnimeDetail.mjs";

await loadHeaderFooter();

const animeID = getParam("anime");
const animeData = new AnimeData();
const mainContainer = document.querySelector("main");
const loadingIndicator = document.querySelector("#loading-indicator");
const animeDetail = new AnimeDetail(animeID,mainContainer,animeData,loadingIndicator);
await animeDetail.init();