import loadHeaderFooter from "./loadHeaderFooter.mjs";
import AnimeFavorite from "./AnimeFavorite.mjs";
import AnimeFavoriteData from "./AnimeFavoriteData.mjs";
import UserData from "./UserData.mjs";
import User from "./User.mjs";

await loadHeaderFooter();

const userData = new UserData();
const user = new User(userData);
user.init();
const isUserAuthenticated = user.isAuthenticated();

const animeFavoritesList = document.querySelector("#anime-favorites");
const animeFavoriteData = new AnimeFavoriteData();
const animeFavorite = new AnimeFavorite(animeFavoritesList,animeFavoriteData,isUserAuthenticated);
animeFavorite.init();