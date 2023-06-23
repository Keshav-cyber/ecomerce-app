import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authService from './auth/authServices';

const AddProduct = () => {
 

    const [{name,price,imageLink,quantity,details},setProductDetails] = useState({
      name:"",
      price:0,
      imageLink:"",
      quantity:"",
      details:""
    })

   
    const navigate = useNavigate();
    let user = authService.getCurrentUser();
    const url = authService.API_URL;

  function createProduct(){
    console.log(name,price,imageLink,quantity,details)
    console.log(user.token)
    let newProduct ={
        name,
        price,
        imageLink,
        quantity,
        details
    }
   
     axios.post(
        url+"/product",newProduct,{ headers: {"Authorization" : `${user.token}`}}
     ).then((res)=>{
        console.log(res)
        navigate("/admin");
     })
      .catch((err)=>console.log(err));
  }

  function handleOnChange(e){
     const{name,value} = e.target

     setProductDetails((prev)=>{
        return {
          ...prev,
          [name]:value
        }
     })
  }

  return (
    <div style={{maxWidth:"500px"}} class="container mt-5 text-center">
    <p class="h3">Add product</p>
    <form>
        
        <div class="form-floating mb-3">
            <input type="text" name="name" class="form-control"
                    value={name}
                    onChange={handleOnChange}
                     placeholder=""/> 
                  <label>Name</label>
                <div id="name-error" ></div>
        </div>
        <div class="form-floating mb-3">
            <input type="number" name="price" class="form-control"
            value={price}
            onChange={handleOnChange}
                 id="price" placeholder="price"/>
            <label for="floatingPassword">Price</label>
            <div id="price-error" ></div>
        </div>
        <div class="form-floating mb-3">
            <textarea class="form-control" name="details"
                value={details}
                onChange={handleOnChange}
                placeholder="add details here" id="details" style={{height:"100px"}}></textarea>
            <label for="floatingTextarea2">Details</label>
            <div id="details-error" ></div>

            <div class="form-floating mb-3 mt-3">
                <input type="text" name="imageLink" class="form-control"
                     value={imageLink}
                     onChange={handleOnChange}
                     id="imagelink" placeholder=""/>
                <label for="floatingInput">Image Link</label>
                <div id="imagelink-error" ></div>
            </div>
            <div class="form-floating mb-3">
                <input type="number" name="quantity" class="form-control"
                     id="quantity"
                     value={quantity}
                    onChange={handleOnChange}
                    placeholder="quantity"/> <label for="floatingPassword">Quantity</label>
                    <div id="quantity-error" ></div>
            </div>
            <div class=" text-center">

                <button type="button"
                   onClick={createProduct}
                    class="btn btn-primary">Add</button>
            </div>
            </div>
    </form>
</div>
  )
}

export default AddProduct


