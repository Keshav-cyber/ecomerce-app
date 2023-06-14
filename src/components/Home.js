import React, { useState,useEffect } from 'react'
import axios from "axios";
import ProductCard from './ProductCard';
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  let [products,setProducts] = useState([]);
  let [nextCursor,setNextCursor] = useState("");


  useEffect(() => {
    if (products.length < 1) {
      axios.get("https://gclouddemo-384110.uc.r.appspot.com/getByCursor?newCursor="+nextCursor)
           .then((response) => {
            
             setProducts(response.data.entities);
             setNextCursor(response.data.nextCursor);
             
            
      });
    }
  },[]);
  
  // let productsList = products.map(product => {return (
  //       <ProductCard product={product} key={product.id} />
  //     )}

  //   )
  function fetchMore(){
    axios.get("https://gclouddemo-384110.uc.r.appspot.com/getByCursor?newCursor="+nextCursor)
           .then((response) => {
            
             setProducts(products.concat(response.data.entities));
             setNextCursor(response.data.nextCursor);
             
            
       });
  }


  return (
    // <div className='container'> {productsList}</div>
    <InfiniteScroll
     dataLength={products.length}
     next={fetchMore}
     hasMore={nextCursor != null}
     loader={<h1>...loading</h1>}
    >
      <div className='container mt-5'>
      <div className='row mt-3'>
        {
        products.map(product => {return (
        <ProductCard product={product} key={product.id} />
         )}
         )
        }
      </div>
      </div>
    </InfiniteScroll>
  )
}

export default Home
