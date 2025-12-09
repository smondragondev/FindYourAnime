import User from "./User.mjs";
import UserData from "./UserData.mjs";
import { loadTemplate, renderWithTemplate,getLastModification,getCurrentPath } from "./utils.mjs";

export default async function loadHeaderFooter(callback) {
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const headerTemplate = await loadTemplate("/FindYourAnime/partials/header.html");
  const footerTemplate = await loadTemplate("/FindYourAnime/partials/footer.html");
  renderWithTemplate(headerTemplate, header, "", callback);
  renderWithTemplate(footerTemplate, footer);
  getLastModification();
  handleMenu();
  addWayFinding("nav-options");
  addWayFinding("left-nav-options");
  handleAuthentication();
}

export function addWayFinding(parentSelector) {
  const navOptions = document.querySelectorAll(`#${parentSelector} li a`);
  navOptions.forEach(
    (option) => {
      const currentPath = getCurrentPath();
      if (currentPath === "/FindYourAnime/" && option.pathname === "/index.html"){
        option.classList.add("text-primary-900");
        option.classList.add("border-t-3");
        return
      }
      if (option.pathname === currentPath) {
        option.classList.add("text-primary-900");
        option.classList.add("border-t-3");
      }
    }
  )
}

export function handleMenu(){
  const openMenuButton = document.querySelector("#menu-button");
  const closeMenu = document.querySelector("#close-menu");
  openMenuButton.addEventListener("click",() => {
    toggleHeader();
    addWayFinding();
  });
  closeMenu.addEventListener("click", () => {
    toggleHeader();
  });
}

export function toggleHeader(){
  const optionMenu = document.querySelector("#option-menu");
  const headerMenu = document.querySelector("#header-menu");
  headerMenu.classList.toggle("hidden");
  optionMenu.classList.toggle("flex");
  optionMenu.classList.toggle("hidden");
}

export function handleAuthentication(){
    const userData = new UserData();
    const user = new User(userData);
    user.init();
    const loginButton = document.getElementById("login-button");
    loginButton.classList.toggle("hidden");
    
    const userName = document.getElementById("username");
    userName.textContent = user.getUserData().username;
}
