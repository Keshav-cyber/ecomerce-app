import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from './Product'
import authService from "./auth/authServices";
import { useNavigate } from "react-router-dom";

const Admin = () => {

  const [products,setProducts] =useState([]);

  let user = authService.getCurrentUser();
  const navigate = useNavigate();

  useEffect( () => {
    console.log(user)
    axios.get("https://gclouddemo-384110.uc.r.appspot.com/radmin/products",{ headers: {"Authorization" : `${user.token}`}})
       .then((response) => {
        
        setProducts(response.data)
        
  }).catch(
    error=>console.log(error)
  );

},[]);



  let productTable = products.map((product)=>{
     return(
        <Product product={product} key={product.id}/>
     )
  })
  function addProduct(){
      navigate("/admin/addProduct")
  }

  return (
    <div className="container admin mt-5">
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
          </tr>
        </thead>
        <tbody>
          {productTable}
        </tbody>
      </table>

     
    </div>
  );
};

export default Admin;
