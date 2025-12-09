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


// get a url params
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const paramValue = urlParams.get(param);
  return paramValue;
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