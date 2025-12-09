import loadHeaderFooter from "./loadHeaderFooter.mjs";
import User from "./User.mjs";
import UserData from "./UserData.mjs";



loadHeaderFooter();

const userData = new UserData();
const user = new User(userData);

const loginForm = document.querySelector("form");
loginForm.addEventListener("submit", () => {
    user.logout();
})