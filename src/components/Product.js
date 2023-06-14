import axios from 'axios'
import React from 'react'
import authService from './auth/authServices'
import { useNavigate } from 'react-router-dom';


const ProductLine = ({product,handleDelete}) => {
  let user = authService.getCurrentUser();
  const{id,name,details,imageLink,quantity,price} = product
  let navigate = useNavigate();


  function deleteProduct(){
    console.log(id)
    axios.get("https://gclouddemo-384110.uc.r.appspot.com/radmin/delete/"+id,{ headers: {"Authorization" : `${user.token}`}}).then((res)=>{
       window.location.reload();
    })
  }

  function updateProduct(){
    navigate("/admin/updateProduct",{state:product})
  }

  return (
    <tr key={id}>
                <td>{name}</td>
                <td>{price}</td>
                <td>{details}</td>
                <td>{imageLink}</td>
                <td>{quantity}</td>
                <td>
                 <button onClick={()=>handleDelete(id)} className="btn btn-primary">Delete</button>
                 
                </td>
                <td>
                
                <button onClick={updateProduct} className="btn btn-primary">Update</button>  
                </td>
              </tr>
  )
}

export default ProductLine
