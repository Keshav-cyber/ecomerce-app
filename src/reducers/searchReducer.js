const initialSearchString =""


export const searchReducer= (state=initialSearchString,{type,payload})=>{
   switch(type){
      case  "SET_SEARCH_QUERY" :
        return payload;

      default : 
         return "";
   }
}