import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const SortComp = ({handleSort}) => {

  const [sortOrder,setSortOrder] = useState("Newest Arrivals");

  return (
    <div className="mt-3 px-3 d-flex align-items-center ">
      Sort by :
      <DropdownButton
        id="dropdown-variants-secondary"
        title={sortOrder}
        variant="transparent"
      >
        <Dropdown.Item onClick={(e)=>{
         
          handleSort(1)}} id="Low to High">Low to High</Dropdown.Item>
        <Dropdown.Item onClick={()=>handleSort(-1)} id="High to Low">High to Low</Dropdown.Item>
       
      </DropdownButton>
    </div>
  );
};

export default SortComp;
