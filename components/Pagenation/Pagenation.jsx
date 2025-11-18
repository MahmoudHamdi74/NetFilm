import React from 'react'
import Pagination from "react-bootstrap/Pagination";
import './Pagenation.css';


const Pagenation = ({page,setPage}) => {
  return (
    <div className="Pagination  py-3 ">

        <Pagination  style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"20px"}} >
      <Pagination.First onClick={()=> setPage(1)} disabled={page===1} />
      <Pagination.Prev onClick={()=> setPage(page-1)} disabled={page===1} />
      <Pagination.Item >{page}</Pagination.Item>
      <Pagination.Next onClick={()=> setPage(page+1)} disabled={page===500} />
      <Pagination.Last onClick={()=> setPage(500)} disabled={page===500} />
    </Pagination>
      </div>
  )
}

export default Pagenation