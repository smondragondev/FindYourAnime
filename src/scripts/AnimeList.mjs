import { renderListWithTemplate } from "./utils.mjs";

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
export default class AnimeList {
  constructor(
    outputHTML,
    dataSource,) {
    this.outputHTML = outputHTML;
    this.dataSource = dataSource;
    this.animeList = [];
    this.isLoading = false;
    this.hasMoreData = true;
    this.currentPage = 1;
    this.filters = {};
  }

  async init() {
  }

  setupFilters({
      ageRating,
      averageRating,
      episodeCount,
      text,
    }){
    this.setNewLoad();
    this.renderList({clear:true})
    this.filters = {
      ageRating,
      averageRating,
      episodeCount,
      text,
    }
  }

  setupInfiniteScroll() {
    let sentinel = document.querySelector("#load-more-trigger");
    const loadingIndicator = document.querySelector("#loading-indicator");
    if (!sentinel) {
      sentinel = document.createElement("div");
      sentinel.id = "load-more-trigger";
      sentinel.className = "h-10";
      this.outputHTML.parentElement.appendChild(sentinel);
    }
    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !this.isLoading && this.hasMoreData) {
          if (this.isLoading || !this.hasMoreData) return;
          this.isLoading = true;
          this.toggleIndicatorVisibility(loadingIndicator);
          await this.loadNextPage();
          this.toggleIndicatorVisibility(loadingIndicator);
          this.isLoading = false;
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0
      }
    )
    observer.observe(sentinel);
    this.scrollObserver = observer;
    this.sentinel = sentinel;
  }

  async renderFilteredList() {
    this.renderLoading();
    this.animeList = await this.dataSource.getData();
    this.renderList({ clear: true });
    this.currentPage++;
  }

  async renderFeaturedList() {
    this.renderLoading();
    this.animeList = await this.dataSource.getData({ pageSize: 3, sort: "popularityRank" });
    this.renderList({ clear: true });
  }

  toggleIndicatorVisibility(loadingIndicator) {
    loadingIndicator.classList.toggle("hidden");
    loadingIndicator.classList.toggle("flex");
  }

  setNewLoad(){
    this.animeList = [];
    this.isLoading = false;
    this.hasMoreData = true;
    this.currentPage = 1;
  }

  async loadNextPage() {
    try {
      const newAnime = await this.dataSource.getData({
        pageNumber: this.currentPage,
        ...this.filters,
      });
      if (newAnime && newAnime.length > 0) {
        this.animeList = [...this.animeList, ...newAnime];
        this.currentPage++;
        this.renderList({ position: "beforeend", animeList: newAnime })
      } else {
        this.hasMoreData = false;
        this.scrollObserver.disconnect();
        this.sentinel.remove();
      }
    } catch (error) {
      throw Error("Error loading anime:", error);
    }
  }

  renderLoading() {
    this.outputHTML.innerHTML = `
          <div class="flex justify-center items-center py-8 min-w-[95dvw]">
            <span class="loader"></span>
          </div>
    `;
  }

  renderList({ position = "afterbegin", clear = false, animeList = this.animeList } = {}) {
    renderListWithTemplate(
      animeCardTemplate,
      this.outputHTML,
      animeList,
      position,
      clear
    );
  }
}