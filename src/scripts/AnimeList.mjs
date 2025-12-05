import { renderListWithTemplate } from "./utils.mjs";

function animeCardTemplate(animeItem){
    return `
    <div class="flex flex-col text-start justify-center items-center gap-4 border-2 border-secondary-500 pb-2">
        <img src="${animeItem.attributes.posterImage.large}" alt=""  class="w-full h-120 object-cover" loading="lazy">
        <div class="flex flex-col gap-4 h-full w-full px-4">
          <div class="self-start">
            <h2>${animeItem.attributes.ageRating} - ${animeItem.attributes.ageRatingGuide}</h2>
            <p class="font-bold text-2xl sm:h-[60px]">${animeItem.attributes.titles.en ?? animeItem.attributes.titles.en_jp}</p>
          </div>
          <div class="border flex gap-8 px-5 py-5 w-full">
            <img src="/FindYourAnime/images/chart-bar-popular.svg" alt="Popular icon" width="48">
            <div>
              <p class="text-3xl">${animeItem.attributes.averageRating}</p>
              <p class="text-typeface">Rating</p>
            </div>
          </div>
        </div>
        <a class="bg-secondary text-lg text-typeface px-5 py-5 rounded-2xl hover:bg-secondary-900 hover:text-background cursor-pointer">
          View Details
        </a>          
    </div>
    `
}
export default class AnimeList {
    constructor(outputHTML, dataSource) {
        this.outputHTML = outputHTML;
        this.dataSource = dataSource;
        this.animeList = [];
        this.loadingData = true;
    }

    async init() {
        this.renderLoading();
        this.animeList = await this.dataSource.getData();
        this.renderList();
    }

    renderLoading(){
        this.outputHTML.innerHTML = `
          <div class="flex justify-center items-center py-8 min-w-[95dvw]">
            <span class="loader"></span>
          </div>
        `;
    }
    renderList() {
        renderListWithTemplate(
            animeCardTemplate,
            this.outputHTML,
            this.animeList,
        );
    }
}