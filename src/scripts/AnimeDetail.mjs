import { renderWithTemplate } from "./utils.mjs";

function animeCardDetailTemplate(animeItem) {
    const animeAttributes = animeItem.attributes;
    const startDate = animeAttributes.startDate.substring(0,4);
    const endDate = animeAttributes.endDate.substring(0,4);
    const dateInformation = startDate === endDate 
                            ? startDate : `${startDate} - ${endDate}`;
    return `
     <div class="grid grid-cols-3 gap-4">
            <h1 class="col-span-2 text-3xl sm:text-5xl lg:text-7xl">${animeAttributes.canonicalTitle}</h1>   
            <div class="hidden sm:flex sm:gap-4">
                <p class="bg-primary h-fit p-2 rounded-2xl">Rank ${animeAttributes.popularityRank} Popularity</p> 
                <p class="bg-secondary h-fit p-2 rounded-2xl"> Rank ${animeAttributes.ratingRank} Rating</p>
            </div>
            <p class="sm:hidden">${dateInformation}</p>
        </div>
        <p class="hidden sm:block">${dateInformation}</p>
        <div class="flex mt-3 gap-3 sm:hidden">
            <p class="bg-primary h-fit p-2 rounded-2xl">Rank ${animeAttributes.popularityRank} (Popular Anime)</p> 
                <p class="bg-secondary h-fit p-2 rounded-2xl"> Rank ${animeAttributes.ratingRank} Rating</p>
        </div>
        <section class="flex flex-col sm:flex-row sm:gap-8 pt-0 py-20 mt-8">        
            <img class="block mx-auto shadow-lg sm:shadow-2xl shadow-primary hover:transition-transform hover:scale-110" width="350" src="${animeAttributes.posterImage.medium}" alt="Cover image of ${animeAttributes.canonicalTitle}">
            <div class="flex flex-col gap-3">
                <h2 class="font-bold text-2xl mt-4 sm:text-3xl sm:mt-0">Description</h2>
                <p>${animeAttributes.synopsis}</p>
            </div>
            <div id="loading-indicator" class="hidden justify-center items-center py-8 min-w-[95dvw]">
                <span class="loader"></span>
            </div>
        </section>
    `
}
export default class AnimeDetail{
    constructor(id,outputHTML,dataSource,loadingIndicator){
        this.id = id;
        this.outputHTML = outputHTML;
        this.dataSource = dataSource;
        this.loadingIndicator = loadingIndicator;
        this.anime = {};
    }    

    async init(){
        this.toggleLoading();
        this.anime = await this.dataSource.findById(this.id);
        this.toggleLoading();
        this.renderAnimeDetail();
    }

    toggleLoading(){
        this.loadingIndicator.classList.toggle("hidden");
        this.loadingIndicator.classList.toggle("flex");
    }

    renderAnimeDetail(){
        renderWithTemplate(
            animeCardDetailTemplate(this.anime),
            this.outputHTML,
        )
    }
}