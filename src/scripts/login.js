import loadHeaderFooter from "./loadHeaderFooter.mjs";
import User from "./User.mjs";
import UserData from "./UserData.mjs";



loadHeaderFooter();

const userData = new UserData();
const user = new User(userData);

const loginForm = document.querySelector("form");
loginForm.addEventListener("submit", (event) => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (!username || !password){
        event.preventDefault();
        alert("Please fill out all required fields.");
        return;
    }
    user.login({username});
})