import React, { useEffect, useReducer} from 'react'
import axios from 'axios';
import OrderCard from './OrderCard';
import authService from './auth/authServices';
import { Link } from 'react-router-dom';
const initialState = []

const reducer = (state,{type,payload})=>{
   
   switch(type){
    case "SET_ORDERS" :
        return [...payload]
    case "CANCEL_ORDER" :
         return state.filter((order)=> order.orderId !== payload)

    default :
       return state;
   }
}

const Orders = () => {

   let [orders , dispatch] = useReducer(reducer,initialState)
   let user = authService.getCurrentUser();
   const url = authService.API_URL
   useEffect( () => {
    
        console.log(user)
        axios.get(url+"/rest/orders",{ headers: {"Authorization" : `${user.token}`}})
           .then((response) => {
            
            dispatch({type:"SET_ORDERS",payload:response.data})
            
      }).catch(
        error=>console.log(error)
      );
    
  },[]);


  function cancleOrder(orderId){
    console.log(orderId)
    axios.delete(url+"/rest/order/"+orderId,
    {
        headers: {
        Authorization: user.token
      }})
    .then(dispatch({type:"CANCEL_ORDER",payload:orderId}))
    .catch(error=>console.log(error))
  }

  let ordersList = orders.map(order=>{
    return(
        <OrderCard order={order} key ={order.orderId} handleCancle={cancleOrder}/>
    )
  })

  return (
    <div className='container'>
       
        <div>
              <li>
              <Link to="/"> Home </Link>
              </li>
              </div>

              { !orders.length && <div>
            <h3>No orders shop </h3>
          </div>}
      {ordersList}
      </div>
  )
}

export default Orders



