import React from 'react'
import axios from 'axios'
import authService from './auth/authServices'
import {  useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const ProductCard = (props) => {
    const {name, price,imageLink,quantity,id,discount} = props.product

    let user = authService.getCurrentUser();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    
    
    function createOrder(){
       
        if(!user){
            console.log(user, "fromm create order")
            navigate("/login")
            return;
        }
        
        dispatch({type:"CART_ADD_ITEM",payload:{...props.product,qty:1}})

          

    }

    function handleProdcutDetails (){
       navigate("/product/"+id);
    }



    return (
        <div className="card m-3" style={{width: "25rem"}} >
        <img
            style={{maxWidth: "100%", maxHeight: "200px", width: "auto", height: "auto"}}
            src={imageLink} className="img-fluid" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <div className=" d-flex align-items-center">
           <p className="text fs-4">Price :₹{(price-price*discount/100).toFixed(2)}</p>
           <p className="fw-light text-decoration-line-through ms-2"> ₹ {price} </p>
           <p className="text ms-2 " style={{color:"green"}}>{discount}% off</p>
        </div>
            <button className="btn btn-warning" onClick={handleProdcutDetails}
            disabled={quantity ? false : true}
            >More Details </button>
        </div>
    </div>
  )
}

export default ProductCard




          