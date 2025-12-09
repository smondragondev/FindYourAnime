import { renderListWithTemplate, renderWithTemplate } from "./utils.mjs";

function animeCardTemplate(animeItem) {
  const imageUrl = animeItem.attributes.posterImage.large;
  const ratingText = `${animeItem.attributes.ageRating} - ${animeItem.attributes.ageRatingGuide ?? ""}`;
  const title = animeItem.attributes.canonicalTitle ?? animeItem.attributes.titles.en ?? animeItem.attributes.titles.en_jp ?? animeItem.attributes.titles.ja_jp ?? "No Title";
  const averageRating = animeItem.attributes.averageRating;
  return `
    <div class="flex flex-col text-start justify-center items-center gap-4 border-2 border-secondary-500 pb-2">
        <img src="${imageUrl}" alt="Poster of ${title}" height="480" class="w-full h-120 object-cover" loading="lazy">
        <div class="flex flex-col gap-4 h-full w-full px-4">
          <div class="self-start">
            <h2>${ratingText}</h2>
            <p class="font-bold text-2xl sm:h-[100px]">${title}</p>
          </div>
          <div class="border flex gap-8 px-5 py-5 w-full">
            <img src="/FindYourAnime/images/chart-bar-popular.svg" alt="Popular icon" width="48">
            <div>
              <p class="text-3xl">${averageRating}</p>
              <p class="text-typeface">Rating</p>
            </div>
          </div>
        </div>
        <a 
        href="/FindYourAnime/anime-detail/index.html?anime=${animeItem.id}"
        class="bg-secondary text-lg text-typeface px-5 py-5 rounded-2xl hover:bg-secondary-900 hover:text-background cursor-pointer">
          View Details
        </a>          
    </div>
    `
}
export default class AnimeFavorite {
  constructor(
    outputHTML,
    dataSource,isAuthenticated) {
    this.outputHTML = outputHTML;
    this.dataSource = dataSource;
    this.animeList = [];
    this.isAuthenticated = isAuthenticated;
  }

  init() {
    this.animeList = this.dataSource.getData();
    if (!this.outputHTML) return;
    if (!this.isAuthenticated) {
      this.renderUserIsRequired();
      return;
    }
    this.renderList();
  }

  renderUserIsRequired(){
    const contentHtml = `
      <div class="flex flex-col gap-4 justify-center items-center">
        <p> Please sign in to access your favorites and save your favorite anime.</p>
        <a 
          href="/FindYourAnime/user/index.html"
          class="bg-secondary w-[120px] text-lg text-typeface px-5 py-5 rounded-2xl hover:bg-secondary-900 hover:text-background cursor-pointer">
            Login
        </a>   
      </div>
    `;
    renderWithTemplate(
      contentHtml,
      this.outputHTML.parentElement,
    )
  }

  renderList() {
    renderListWithTemplate(
      animeCardTemplate,
      this.outputHTML,
      this.animeList,
    );
  }

  add(animeItem){
    const animeRepeated = this.animeList.find((anime) => anime.id === animeItem.id);
    if (animeRepeated) return;
    this.animeList.push(animeItem);
    this.dataSource.setData(this.animeList);
  }
}