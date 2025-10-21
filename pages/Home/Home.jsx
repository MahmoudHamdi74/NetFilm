import React from 'react'
import Slider from "../../components/Slider/Slider"
import Cards from "../../components/Cards/Cards";
import Pagenation from "../../components/Pagenation/Pagenation";

const Home = ({movies,setModalShow,setSelected,modalShow,selected,page,setPage}) => {


  return (
    <div><Slider movies={movies}/>

     <Cards movies={movies} setModalShow={setModalShow} setSelected={setSelected} modalShow={modalShow} selected={selected} />

      

      <Pagenation page={page} setPage={setPage}/>
    </div>
      
  )
}

export default Home