import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import authService from './auth/authServices';
import { useNavigate } from 'react-router-dom';

const Cart = () => {


  const cart = useSelector(state=> state.cart)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const url = authService.API_URL;
  
  function increaseQuantity(id){
    console.log(id)
    dispatch({type:"CART_INQTY_ITEM",payload:id})
  }
  function decreseQuantity(id){
    dispatch({type:"CART_DEQTY_ITEM",payload:id})
  }

  function removeProduct(id){
    dispatch({type:"CART_REMOVE_ITEM",payload:id})
  }

  const order = 
     cart.map(product=>{
      return {id:product.id,qty:product.qty,name:product.name}
     })
  

  function checkOut(){
    if(!user){
      console.log(user, "fromm create order")
      navigate("/login")
      return;
      }
    axios.post(
      url+"/rest/create_order",JSON.stringify(order),{ headers: {"Authorization" : `${user.token}`,
      'Content-Type': 'application/json'}}
   ).then((res)=>{
       dispatch({type:"CART_EMPTY_ITEM"})
      navigate("/orders");
      
   })
    .catch((err)=>console.log(err));
  }

  return (
    <div className='container mt-3'>
        <h1>Shooping Cart</h1>
        <div>
              <li>
              <Link to="/"> Home </Link>
              </li>
              </div>
    <div className='container mt-3 d-flex align-items-center'>
    
        <div>
       
       
         {cart.map(((product)=>{
            return (
            
            <div  key={product.id} class=" border rounded mt-3 " style={{width:"600px"}}>
              
            <div class="row" style={{display: "flex",alignItems: "stretch"}}>
              <div class="col">
              <img src={product.imageLink} className='ms-3' style={{width:"75px", maxHeight:"90px"}}/>
              </div>

              <div className='col d-flex align-items-center'>{product.name}</div>
              <div class="col d-flex align-items-center">
              <button class="bi bi-dash-circle" onClick={()=>decreseQuantity(product.id)} disabled={product.qty >= product.quantity}></button>
              <h6 className='m-2'>{product.qty}</h6>
              <button class="bi bi-plus-circle" onClick={()=>increaseQuantity(product.id)}></button>
              </div>
              
              <div className="col d-flex align-items-center ">
              <h6 className=''>{product.price}</h6>
              </div>
              <div className="col d-flex align-items-center ">
                 <button className="bi bi-trash-fill" onClick={()=>removeProduct(product.id)}></button>
                </div>
            </div>
            </div>
            )
         }))}
         </div>

         <div className='border rounded text-center ms-3 mt-3' style={{width:"300px",height:"180px"}}> 
         <h6 className='mt-5'>SubTotal : {
             cart.reduce((a, c) => a + c.price * c.qty, 0)
         }</h6>
         <button className='btn btn-warning' onClick={checkOut}>CheckOut</button>
         </div>
         
        
    </div> 
    </div>
  )
}

export default Cart
