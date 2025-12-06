import { QUOTE_KEY } from "./constants.mjs";
import { getLocalStorage,setLocalStorage,renderWithTemplate,renderListWithTemplate } from "./utils.mjs";

function quoteCardTemplate(quote) {
    return `
        <div class="relative flex flex-col text-start gap-4 border-2 border-secondary-500 p-8">
            <button class="delete-button absolute top-2 -right-2 w-10 cursor-pointer" data-content="${quote.content}">
                <img src="/FindYourAnime/images/x-secondary.svg" alt="Delete Quote button" width="24">
            </button>
            <h2 class="text-3xl sm:text-5xl text-center font-cursive! mb-4">"${quote.content}"</h2>
            <h3 class="text-lg text-secondary-700">Anime: ${quote.anime.name}</h3>
            <p class="text-sm -mt-3">${quote.anime.altName}</h3>
            <p class="text-primary-700">Character: ${quote.character.name}</p>
        </div>
    `;
}

function generatedQuoteTemplate(quote){
    return `
        <h2 class="text-4xl sm:text-7xl text-center font-cursive! mb-4">"${quote.content}"</h2>
        <h3 class="text-xl text-secondary-700">Anime: ${quote.anime.name}</h3>
        <p class="text-sm -mt-3"> ${quote.anime.altName}</h3>
        <p class="text-primary-700">Character: ${quote.character.name}</p>
    `;
}

export default class Quote{

    constructor(outputListHTML,outputHTML,dataSource){
        this.outputHTML = outputHTML;
        this.outputListHTML = outputListHTML;
        this.dataSource = dataSource;
        this.quotes = [];
    }

    async init(){
        this.quotes = getLocalStorage(QUOTE_KEY) ?? [];
        this.renderGeneratedQuoteList();
    }

    async generate(){
        this.generatedQuote = await this.dataSource.getData();
        this.renderGeneratedQuote(this.generatedQuote);
    }

    saveQuote(){
        this.quotes.push(this.generatedQuote);
        setLocalStorage(QUOTE_KEY,this.quotes);
        this.renderNewSavedQuote();
    }

    deleteQuote(content){
        console.log(this.quotes);
        const selectedQuote = this.quotes.find((quote) => quote.content === content);
        if (!selectedQuote) return;
        this.quotes = this.quotes.filter((quote) => quote.content !== content);
        setLocalStorage(QUOTE_KEY, this.quotes);
        this.renderGeneratedQuoteList();
    }

    renderNewSavedQuote() {
        renderListWithTemplate(
          quoteCardTemplate,
          this.outputListHTML,
          [this.generatedQuote],
          "beforeend",
        );
      }

    renderGeneratedQuoteList(){
        if (this.quotes.length !== 0){
            renderListWithTemplate(
                quoteCardTemplate,
                this.outputListHTML,
                this.quotes,
                "afterbegin",
                true,
            )
        } else {
            const emptyHTML = `
                <p class="sm:text-xl sm:mt-8">No generated quotes are saved</p>
            `;
            this.outputListHTML.parentElement.insertAdjacentHTML("beforeend", emptyHTML);
        }
    }

    renderGeneratedQuote(quote){
        const quoteHTML = generatedQuoteTemplate(quote);
        renderWithTemplate(
            quoteHTML,
            this.outputHTML,
        )
    }

}