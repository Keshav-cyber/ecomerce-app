import React, { useReducer, useState,useEffect } from "react";

import axios from "axios";
import Product from './Product'
import authService from "./auth/authServices";
import AddProductModal from "./AddProductModal";

const reducer = (state, { type, payload }) => {
  switch(type){
    case "SET_PRODUCT":
        return {...state,products:payload}
    case "ADD_NEW_PRODUCT"  :
        return{...state,products:[...state.products,payload]}

    case "DELETE_PRODUCT" :
        return {
            ...state , products:state.products.filter((item)=> item.id !== payload)
        }

    default :
       return state;
  }
};

const initialState = {
  products: [],
  selectedProduct: {},
};

const NewAdmin = () => {
  const [data, dispatch] = useReducer(reducer, initialState);
  const[showAddProduct,setAddProduct] = useState(false)

  let user = authService.getCurrentUser();
  const url = authService.API_URL

  useEffect( () => {
    
    axios.get(url+"/radmin/products",{ headers: {"Authorization" : `${user.token}`}})
       .then((response) => {
        
        dispatch({type:"SET_PRODUCT",payload:response.data})
        
  }).catch(
    error=>console.log(error)
  );

},[]);

function createProduct(name,price,imageLink,quantity,details){
   
    let newProduct ={
        name,
        price,
        imageLink,
        quantity,
        details
    }
   
     axios.post(
        url+"/radmin/product",newProduct,{ headers: {"Authorization" : `${user.token}`}}
     ).then((res)=>{
        dispatch({type:"ADD_NEW_PRODUCT",payload:newProduct})
     })
      .catch((err)=>console.log(err));
  }
  function deleteProduct(id){
    axios.get(url+"/radmin/delete/"+id,{ headers: {"Authorization" : `${user.token}`}}).then((res)=>{
        dispatch({type:"DELETE_PRODUCT",payload:id})
     })
  }

  let productTable = data.products.map((product)=>{
     return(
        <Product product={product} key={product.id} handleDelete={deleteProduct}/>
     )
  })
  function addProduct(){
      setAddProduct(true);
  }
  function closeModal(){
    setAddProduct(false);
  }
  

  return (
    <div className="container admin mt-5">
       {showAddProduct &&  <AddProductModal handleClose={closeModal} handleAddProduct={createProduct} />}
      <div className="col">
       <button className="btn btn-primary" onClick={addProduct}>Add Product</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Details</th>
            <th scope="col">Image</th>
            <th scope="col">Quantity</th>
            <th scope="col">Discount</th>
          </tr>
        </thead>
        <tbody>
          {productTable}
        </tbody>
      </table>

     
    </div>
  )
};

export default NewAdmin;
