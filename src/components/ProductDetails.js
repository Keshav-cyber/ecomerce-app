import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authService from "./auth/authServices";
import axios from "axios";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const { pid } = useParams();
  const [{name, price,imageLink,quantity,id,discount}, setProduct] = useState({});
  const dispatch = useDispatch();
  const url = authService.API_URL;
  
  useEffect(() => {
    axios
      .get(url + "/product/" + pid)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  function createOrder(){
      
    
    dispatch({type:"CART_ADD_ITEM",payload:{...{name, price,imageLink,quantity,id,discount},qty:1}})
}


  return (
    <div className="m-3 d-flex align-space-between">
      <div className="border rounded d-flex align-items-center">
      <img
        style={{
          height:"80%",
          width:"60%"
        }}
        src={imageLink}
        className="img-fluid"
        alt="..."
      />
      </div>
      <div className="d-flex align-items-center">
      <div className="container">
        <h3 className="title">{name}</h3>
        
        <p> Details : Represents the details of a one time or subscription product. Summary. Nested classes. class, ProductDetails.OneTimePurchaseOfferDetails.</p>

        <p className="text">Available Quantity :{quantity}</p>
        <div className=" d-flex align-items-center">
           <p className="text fs-3">Price :₹{(price-price*discount/100).toFixed(2)}</p>
           <p className="fw-light text-decoration-line-through ms-2"> ₹ {price} </p>
           <p className="text ms-2 " style={{color:"green"}}>{discount}% off</p>
        </div>
        <button
          className="btn btn-warning"
          onClick={createOrder}
          disabled={quantity ? false : true}
        >
          Add to Cart {" "}
        </button>
      </div>
      </div>
    </div>
  );
};

export default ProductDetails;
