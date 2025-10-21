import React, { useState, useEffect } from 'react'
import Cards from '../../components/Cards/Cards'
import Pagenation from '../../components/Pagenation/Pagenation'
import Loader from '../../components/loader/loader'




const Movies = ({movies,setSelected,setModalShow,modalShow,selected ,page ,setPage,HandleAdd
}) => {  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
        <Cards movies={movies} setModalShow={setModalShow} setSelected={setSelected} modalShow={modalShow} selected={selected} HandleAdd={HandleAdd} />
        <Pagenation page={page} setPage={setPage}/>
    </div>
  )
}

export default Movies