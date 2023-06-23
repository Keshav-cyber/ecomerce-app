import React from "react";

const OrderCard = ({ order, handleCancle }) => {
  const {
    orderId,
    productIds,
    userName,
    userEmail,
    productName,
    userMobile,
    price,
  } = order;
  console.log(order);
  return (
    <div>
      <div className="container mt-4">
        <div className="card w-75 mb-3">
          <div className="card-body">
            <h5 className="card-title">Order Id : {orderId}</h5>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>{productIds.map((obj)=>{
                return(
                    <tr key={obj.id}>
                    <td>{obj.id}</td>
                    <td>{obj.name}</td>
                    <td>{obj.qty}</td>
                   
                  </tr>
                )
              })}</tbody>
            </table>

            <div className="container d-flex justify-content-end">
                <h3>Total price : {price}</h3>
                </div>



            <button
              className="btn btn-danger"
              onClick={() => handleCancle(orderId)}
            >
              {" "}
              Cancel{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
