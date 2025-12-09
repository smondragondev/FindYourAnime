import { FAVORITES_KEY } from "./constants.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";


export default class AnimeFavoriteData{
    
    getData(){
       const favorites = getLocalStorage(FAVORITES_KEY) ?? [];
       return favorites;
    }

    setData(data){
        setLocalStorage(FAVORITES_KEY,data);
    }

}