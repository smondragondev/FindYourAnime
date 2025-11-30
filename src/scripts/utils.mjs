import { PROJECT_NAME } from "./constants.mjs";

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

export function getCurrentPath() {
  const url = window.location.pathname;
  return url;
}

export function addWayFinding() {
  const navOptions = document.querySelectorAll("#nav-options li a");
  navOptions.forEach(
    (option) => {
      const currentPath = getCurrentPath();
      if (option.pathname === currentPath || option.pathname === "/index.html") {
        option.classList.add("text-primary-900");
        option.classList.add("border-t-3");
      }
    }
  )
}

export async function loadHeaderFooter(callback) {
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const headerTemplate = await loadTemplate("./partials/header.html");
  const footerTemplate = await loadTemplate("./partials/footer.html");
  renderWithTemplate(headerTemplate, header, "", callback);
  renderWithTemplate(footerTemplate, footer);
  addWayFinding();
}