import loadHeaderFooter from "./loadHeaderFooter.mjs";
import FeatureData from "./FeatureData.mjs";
import Features from "./Features.mjs";
import AnimeData from "./AnimeData.mjs";
import AnimeList from "./AnimeList.mjs";

loadHeaderFooter();

const featureData = new FeatureData("data/features.json");
const features = new Features("#features",featureData);
features.init();

const featuredAnime = document.querySelector("#fetured-anime");
const animeData = new AnimeData();
const animeList = new AnimeList(featuredAnime,animeData);
animeList.renderFeaturedList();