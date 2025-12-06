import { loadHeaderFooter } from "./utils.mjs";
import Quote from "./Quote.mjs";
import QuoteData from "./QuoteData.mjs";

await loadHeaderFooter();

const quoteList = document.querySelector("#quote-list");
const generatedQuote = document.querySelector("#generated-quote");
const quoteData = new QuoteData();
const quote = new Quote(quoteList, generatedQuote, quoteData)
await quote.init();

const generateButton = document.querySelector("#generate-button");
const loadingIndicator = document.querySelector("#loading-indicator");
const saveQuote = document.querySelector("#save-quote");
const newQuote = document.querySelector("#new-quote");

generateButton.addEventListener("click", async () => {
    loadingIndicator.classList.toggle("hidden");
    loadingIndicator.classList.toggle("flex");
    generateButton.classList.toggle("hidden");
    await quote.generate();
    loadingIndicator.classList.toggle("hidden");
    loadingIndicator.classList.toggle("flex");
    // Display de generatedQuote div
    generatedQuote.classList.toggle("hidden");
    generatedQuote.classList.toggle("flex");
    // Display the buttons
    saveQuote.classList.toggle("hidden");
    newQuote.classList.toggle("hidden");
})

saveQuote.addEventListener("click", () => {
    quote.saveQuote();
})

newQuote.addEventListener("click", async () => {
    generatedQuote.classList.toggle("hidden");
    generatedQuote.classList.toggle("flex");
    loadingIndicator.classList.toggle("hidden");
    loadingIndicator.classList.toggle("flex");
    saveQuote.classList.toggle("hidden");
    newQuote.classList.toggle("hidden");
    await quote.generate();
    loadingIndicator.classList.toggle("hidden");
    loadingIndicator.classList.toggle("flex");
    // Display de generatedQuote div
    generatedQuote.classList.toggle("hidden");
    generatedQuote.classList.toggle("flex");
    // Display the buttons
    saveQuote.classList.toggle("hidden");
    newQuote.classList.toggle("hidden");
})


const deleteButtons = document.querySelectorAll(".delete-button");
deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
        const content = deleteButton.dataset.content;
        quote.deleteQuote(content);
    });
});