import { USER_KEY } from "./constants.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";


export default class UserData{
    
    getData(){
       const data = getLocalStorage(USER_KEY) ?? [];
       return data;
    }

    setData(data){
        setLocalStorage(USER_KEY,data);
    }

}