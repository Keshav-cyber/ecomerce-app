import React from 'react'
import axios from 'axios'
import authService from './auth/authServices'
import {  useNavigate } from 'react-router-dom'

const ProductCard = (props) => {
    const {name, price,imageLink,quantity,id} = props.product

    let user = authService.getCurrentUser();
    let navigate = useNavigate();
    
    function createOrder(){
       
        if(!user){
            console.log(user, "fromm create order")
            navigate("/login")
            return;
        }

        axios.get("https://gclouddemo-384110.uc.r.appspot.com/rest/create_order/"+id,{ headers: {"Authorization" : `${user.token}`}})
        .then((res) => navigate("/orders"))
        .catch(
            (error) => {console.log(error)}
        )

    }

    return (
        <div className="card m-3" style={{width: "25rem"}} >
        <img
            style={{maxWidth: "100%", maxHeight: "200px", width: "auto", height: "auto"}}
            src={imageLink} className="img-fluid" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">
                price :{price}
                
            </p>
           
            <p className="card-text">
                Available Quantity :{quantity}
                
            </p>
            <button className="btn btn-primary" onClick={createOrder}
            disabled={quantity ? false : true}
            >Buy Now </button>
        </div>
    </div>
  )
}

export default ProductCard




          