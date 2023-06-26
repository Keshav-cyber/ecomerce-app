
import{ cartConstants} from "../constants/cartConstants"

const initialCart =localStorage.getItem("cart") ? JSON.parse(localStorage.getItem('cart')) : []


export const cartReducer = (state=initialCart,{type,payload})=>{
   switch(type){
      case cartConstants.CART_ADD_ITEM :
          const newProduct = payload
          const product = state.find(product => product.id === newProduct.id)
          console.log(product)
          const newItems = product ? state.map((product)=>{
            if(product.id === newProduct.id){
                product.qty = product.qty+1;
            }
            return product;
         }): [...state,payload]
         console.log(newItems)
        localStorage.setItem("cart",JSON.stringify(newItems))
        return newItems

      case cartConstants.CART_REMOVE_ITEM :
          return state.filter((product) => product.id !== payload)

      case cartConstants.CART_INQTY_ITEM:
         const newCart = state.map((product)=>{
            if(product.id === payload){
                product.qty = product.qty+1;
            }
            
            return product;
         })
         localStorage.setItem("cart",JSON.stringify(newCart))
         return newCart;
      case cartConstants.CART_DEQTY_ITEM :
          const updated = state.map((product)=>{
            if(product.id === payload && product.qty >1){
                product.qty = product.qty-1;
            }
            return product;
         })
           localStorage.setItem("cart",JSON.stringify(updated))
          return updated;



       case cartConstants.CART_REMOVE_ITEM :
           return state.filter(product => product.id !== payload) 

       case cartConstants.CART_EMPTY_ITEM :
           localStorage.removeItem("cart");
           return [];

      default :
        return state;
   }
}