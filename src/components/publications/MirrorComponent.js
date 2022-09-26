import React, { useEffect, useState } from 'react'
import SwapHorizSharpIcon from '@mui/icons-material/SwapHorizSharp';
import { LensAuthContext } from '../../context/LensContext';
import { createMirror } from '../../LensProtocol/post/mirror/mirror';
import { CircularProgress, IconButton } from '@mui/material';
import { hasMirrored } from '../../LensProtocol/post/mirror/has-mirror-publications';


function MirrorComponent(props) {
  const lensAuthContext = React.useContext(LensAuthContext);
  const { profile, userAdd, 
    loginCreate, login } = lensAuthContext;

   

  const [loading, setLoading] = useState(false);

  const handleCreateMirror = async () => {
    setLoading(true)
    const id = window.localStorage.getItem("profileId");
    const obj = {
      profileId: id,
      address: userAdd,
      login: login,
      publishId: props.data?.id,
    }
    const res = await createMirror(obj);
    props.setUpdate(!props.update);
    setLoading(false);
  }

  async function getMirroredData(){
    const id = window.localStorage.getItem("profileId"); 
  }

  

  useEffect(() => { 
  async function getLisked() {
    const id = window.localStorage.getItem("profileId"); 
  }
  getLisked();
  }, [props.data, props.update]) 

  return (
    <div
      onClick={handleCreateMirror}
      className="d-flex align-items-center"
      style={{ color: 'white', padding: '5px', margin: '0 5px', cursor: 'pointer' }}
    > 
      {loading ? <CircularProgress /> : ""}
      < SwapHorizSharpIcon /> {props.data && props.data?.stats?.totalAmountOfMirrors}
      <span className="d-none-xss m-1">Mirrors</span>
    </div>
  )
}

export default MirrorComponent