import { getFileData } from "./utils.mjs";


export default class FeatureData{
    constructor(filename){
        this.filename = filename;
        this.data = {};
    }
    
    async getFeatures(){
        this.data = await getFileData(this.filename);
        return this.data;
    }
}