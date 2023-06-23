import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import axios from 'axios';
import { useSelector } from 'react-redux';
import authService from './auth/authServices';
import { Link } from 'react-router-dom';

const SearchProducts = () => {
  
  const string = useSelector(state=>state.searchString)
  const[queryProducts,setQueryString] = useState([])

const url = authService.API_URL
  useEffect(()=>{
    axios.get(url+"/search?queryStr="+string)
           .then((response) => {
            
             setQueryString([...response.data.entities])
            
      });
  },[string])

  return (
    <div className='container mt-5'>
        <div>
              <li>
              <Link to="/"> Home </Link>
              </li>
              </div>
        <div className='row mt-3'>
          {!queryProducts.length && <h3>No Product found ....</h3> }
        {queryProducts.map((product)=>{
            return (
              <ProductCard product={product} key ={product.id}/>
            )
        })}
      </div>
    </div>
  )
}

export default SearchProducts
