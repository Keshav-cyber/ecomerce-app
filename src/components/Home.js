import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import SortComp from "./SortComp";
import authService from "./auth/authServices";

const Home = () => {
  let [products, setProducts] = useState([]);
  let [nextCursor, setNextCursor] = useState("");
  let [sort, setSort] = useState(0);
  const url = authService.API_URL;

  useEffect(() => {
    
      axios
        .get(
          url+`/getByCursor?sortOrder=${sort}&newCursor=${nextCursor}`
        )
        .then((response) => {
          setProducts(response.data.entities);
          setNextCursor(response.data.nextCursor);
        });
        console.log("sort changed")
    
  }, [sort]);

  function fetchMore() {
    axios
      .get(
        url+`/getByCursor?sortOrder=${sort}&newCursor=${nextCursor}`
      )
      .then((response) => {
        setProducts(products.concat(response.data.entities));
        setNextCursor(response.data.nextCursor);
      });
  }

  function handleSort(num) {
    console.log(num)
    setNextCursor("")
    setSort(num)
   }


  return (
    <div className="container ">
      <SortComp handleSort={handleSort}/>

      <InfiniteScroll
        dataLength={products.length}
        next={fetchMore}
        hasMore={nextCursor != null}
        loader={<h1 className="text-center">loading...</h1>}
      >
        <div className="container mt-2">
          <div className="row mt-3">
            {products.map((product) => {
              return <ProductCard product={product} key={product.id} />;
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
