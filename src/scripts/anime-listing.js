import { loadHeaderFooter } from "./utils.mjs";
import AnimeData from "./AnimeData.mjs";
import AnimeList from "./AnimeList.mjs";

await loadHeaderFooter();
const filteredAnime = document.querySelector("#filtered-anime");
const animeData = new AnimeData();
const animeList = new AnimeList(filteredAnime,animeData);
// animeList.renderFilteredList();
animeList.setupInfiniteScroll();