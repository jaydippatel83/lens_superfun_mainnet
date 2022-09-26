import { CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { LensAuthContext } from '../../context/LensContext'; 
import { collect } from '../../LensProtocol/post/collect/create-collect'; 

function CollectComponent(props) {
    const lensAuthContext = React.useContext(LensAuthContext);
   const { profile, userAdd, 
    loginCreate, login } = lensAuthContext;

  const [loading, setLoading] = useState(false);

  const handleCollect=async(id)=>{
    setLoading(true);
    const obj ={
      id : props.data.id,
      login:login,
      address:userAdd
    }
   const res = await collect(obj);  
   setLoading(false);
   props.setUpdate(!props.update);
  }

  return (
    <div
      onClick={handleCollect}
      className="d-flex align-items-center"
      style={{ color: 'white', padding: '5px', margin: '0 5px', cursor: 'pointer' }}
    >
       {loading ? <CircularProgress /> : ""} 
      <img src='https://superfun.infura-ipfs.io/ipfs/QmWimuRCtxvPhruxxZRBpbWoTXK6HDvLZkrcEPvaqyqegy' alt='bg' width="20"/>  {props.data && props.data?.stats?.totalAmountOfCollects}
      <span className="d-none-xss m-1">Collects</span>
    </div>
  )
}

export default CollectComponent