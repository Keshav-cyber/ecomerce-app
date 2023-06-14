import React from 'react'



const OrderCard = ({order,handleCancle}) => {
  const {orderId,userName,userEmail,productName,userMobile,price} = order
  console.log(order)
  return (
    <div>
    <div className="container mt-4">
    <div className="card w-75 mb-3">
        <div className="card-body">
            <h5 className="card-title">
                Order Id : {orderId}
                </h5>
            <p className="card-text">
                Product name :{productName}
                </p>
            <p className="card-text">
                User name :{userName}
                </p>
            <p className="card-text">
                User mobile: {userMobile}
                </p>
            <p className="card-text">
                User email :{userEmail}
                </p>
            <p className="card-text">
                Product price :{price}
                </p>
            <button className='btn btn-danger' onClick={()=>handleCancle(orderId)}> Cancel </button>
        </div>
    </div>
</div>
  
</div>

  )
}

export default OrderCard
