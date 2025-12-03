import {renderListWithTemplate} from "./utils.mjs";

function featureTemplate(feature) {
  return `
        <div class="flex flex-col justify-center items-center gap-4">
              <img src="${feature.icon}" alt="Feature ${feature.title}" width="64" height="64">
              <p>${feature.description}</p>
        </div>
  `
}

export default class Features{
    constructor(outputSelector,dataSource){
        this.outputSelector = outputSelector;
        this.dataSource = dataSource;
    }

    async init(){
        const features = await this.dataSource.getFeatures();
        this.renderFeatures(features);
    }

    renderFeatures(features){
        const outputElement = document.querySelector(this.outputSelector);
        renderListWithTemplate(
            featureTemplate,
            outputElement,
            features,
            "afterbegin",
            true
        );
    }
}