import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authService from "./auth/authServices";
import axios from "axios";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const { pid } = useParams();
  const [{name, price,imageLink,quantity,id,discount}, setProduct] = useState({});
  const dispatch = useDispatch();
  const [count ,setCount ]= useState(1);
  const [buttonClass, setButtonClass] = useState("btn btn-warning mt-2");
  const [buttonText,setButtonText]= useState("ADD TO CART")
  const [disabled,setDisable] = useState(false)
  const url = authService.API_URL;
  
  
  useEffect(() => {
    axios
      .get(url + "/product/" + pid)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  function createOrder(){
    setButtonText("ADDED TO CART")
    setButtonClass("btn btn-danger mt-2");
    setDisable(true);
    dispatch({type:"CART_ADD_ITEM",payload:{...{name, price,imageLink,quantity,id,discount},qty:count}})

}

function increaseQuantity() {
  if(count >= quantity) return ;
  setCount(count + 1)
}
function decreseQuantity() {
  if(count < 2) return ;
   setCount(count-1)
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
        <div class="col d-flex align-items-center px-3">
                    <button
                      class="bi bi-dash-circle"
                      style={{ border: "none", background: "transparent" }}
                      onClick={() => decreseQuantity()}
                      disabled={false}
                    ></button>
                    <h6 className="m-2 border px-4">{count}</h6>
                    <button
                      class="bi bi-plus-circle"
                      style={{ border: "none", background: "transparent" }}
                      onClick={() => increaseQuantity()}
                    ></button>
                  </div>
        <button
          className={buttonClass}
          onClick={createOrder}
          disabled={disabled}
        >
          {buttonText}
        </button>
      </div>
      </div>
    </div>
  );
};

export default ProductDetails;
