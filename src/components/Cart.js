import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import axios from "axios";
import authService from "./auth/authServices";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCouponCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const url = authService.API_URL;

  function increaseQuantity(id) {
    console.log(id);
    dispatch({ type: "CART_INQTY_ITEM", payload: id });
  }
  function decreseQuantity(id) {
    dispatch({ type: "CART_DEQTY_ITEM", payload: id });
  }

  function removeProduct(id) {
    dispatch({ type: "CART_REMOVE_ITEM", payload: id });
  }

  const order = cart.map((product) => {
    return { id: product.id, qty: product.qty, name: product.name };
  });

  function checkOut() {
    if (!user) {
      console.log(user, "from create order");
      navigate("/login");
      return;
    }
    axios
      .post(url + "/rest/create_order?coupon="+coupon, JSON.stringify(order), {
        headers: {
          Authorization: `${user.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: "CART_EMPTY_ITEM" });
        navigate("/orders");
      })
      .catch((err) => console.log(err));
  }

  function handleCupoonCode() {
    axios.get(url + "/checkCode/"+coupon).then(
      (res)=> {
        console.log(res)
        setDiscount(res.data)
      }
    ).catch((err)=>{
      console.log(err)

    })
  }

  const grand_total = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const total_discount = Math.floor(cart.reduce(
    (a, c) => a + ((c.price * c.discount) / 100) * c.qty, 0
  ));

  const final_price = Math.floor(grand_total-total_discount-discount)>0 ? Math.floor(grand_total-total_discount-discount): 0;

  return (
    <div className="container mt-3">
      <h1>Shopping Cart</h1>
      <div>
        <li>
          <Link to="/"> Home </Link>
        </li>
      </div>
      <div className="mt-3 d-flex justify-content-around">
        <div className="text-center">
          {cart.map((product) => {
            return (
              <div
                key={product.id}
                class=" border rounded mt-3"
                style={{ width: "600px" }}
              >
                <div
                  class="row"
                  style={{ display: "flex", alignItems: "stretch" }}
                >
                  <div class="col">
                    <img
                      src={product.imageLink}
                      className="ms-3"
                      style={{ width: "75px", height: "55px" }}
                    />
                  </div>

                  <div className="col d-flex align-items-center">
                    {product.name}
                  </div>
                  <div class="col d-flex align-items-center">
                    <button
                      class="bi bi-dash-circle"
                      style={{ border: "none", background: "transparent" }}
                      onClick={() => decreseQuantity(product.id)}
                      disabled={product.qty >= product.quantity}
                    ></button>
                    <h6 className="m-2 border px-4">{product.qty}</h6>
                    <button
                      class="bi bi-plus-circle"
                      style={{ border: "none", background: "transparent" }}
                      onClick={() => increaseQuantity(product.id)}
                    ></button>
                  </div>

                  <div className="col d-flex align-items-center ">
                    <h6 className="">{product.price}</h6>
                  </div>
                  <div className="col d-flex align-items-center ">
                    <button
                      className="bi bi-trash-fill"
                      style={{ border: "none", background: "transparent" }}
                      onClick={() => removeProduct(product.id)}
                    ></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {cart.length ? (
          <div
            className="border rounded   ms-3 mt-3"
            style={{ width: "400px" }}
          >
            <div className="mt-3 d-flex justify-content-between px-3">
              <p className="text">Total Price :</p>
              <h6>₹ {grand_total}</h6>
            </div>

            <div className=" d-flex justify-content-between px-3">
              <p>Discount :</p>
              <h6 style={{ color: "green" }}>
                -₹
                {total_discount.toFixed(2)}
              </h6>
            </div>

            <div className="d-flex justify-content-between px-3">
              <p>Delivery Charges :</p>
              <h6 style={{ color: "green" }}>Free</h6>
            </div>
            <div className="text-center">
             {
              discount ? (<div className="d-flex justify-content-between mb-3 px-3" style={{color:"green"}}>

                coupon code {coupon} applied successfully <i class="bi bi-check-circle"></i>

              </div> ):(<div class="input-group input-group-sm mb-3 px-3">
              <span class="input-group-text" id="basic-addon3">
                Coupon Code
              </span>
              <input
                type="text"
                class="form-control"
                id="basic-url"
                value={coupon}
                onChange={(e) => setCouponCode(e.target.value)}
                aria-describedby="basic-addon3"
              />
              <button className="btn btn-warning" onClick={handleCupoonCode}>
                Apply
              </button>
            </div>)
             }
              <div className="d-flex justify-content-between px-3">
                <p>coupon Discount :</p>
                <h6 style={{ color: "green" }}>-₹{discount}</h6>
              </div>
              <div className="d-flex justify-content-between px-3">
                <p>Final Price:</p>
                <h6>₹{final_price}</h6>
              </div>

              <button className="btn btn-warning mb-2" onClick={checkOut}>
                Place Order
              </button>
            </div>
          </div>
        ) : (
          <div className="container">
            <h5>No items in cart </h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
