import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const SearchBox = () => {

  const [query ,setQuery]= useState("");
  const dispatch  = useDispatch();
  const navigate = useNavigate()

  function handleSearch(){
    dispatch({type:"SET_SEARCH_QUERY",payload:query})
    navigate("/search")
  }

  return (
    <div className="d-flex align-items-center">
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
      />
      <button class="btn btn-warning my-2 my-sm-0" type="submit" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBox;
