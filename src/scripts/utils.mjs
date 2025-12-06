// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// remove data from local storage
export function removeLocalStorage(key){
  localStorage.removeItem(key);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  //prevent errors if list is null or empty
  if (!list || !Array.isArray(list) || list.length === 0) {
    // parentElement.innerHTML = "";
    return;
  }

  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
//


//////function render added team
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export function getCurrentPath() {
  const url = window.location.pathname;
  return url;
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

export async function loadHeaderFooter(callback) {
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
}

export function getLastModification() {
  const currentYearSpan = document.querySelector("#currentYear");
  const lastModifiedParagraph = document.querySelector("#lastModified");
  // Set the current year
  const currentYear = new Date().getFullYear();
  currentYearSpan.textContent = currentYear;

  // Last modified
  const lastModified = document.lastModified;
  lastModifiedParagraph.textContent = `Last Modification: ${lastModified}`;

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

export async function getFileData(path){
    const response = await fetch(path);
    const data = await response.json();
    return data;
}

export function convertToJson(res) {
    const dataJson = res.json();
    if (res.ok) {
        return dataJson;
    } else {
        const jsonReponse = JSON.stringify(dataJson);
        throw { name: "servicesError", message: jsonReponse };
    }
}