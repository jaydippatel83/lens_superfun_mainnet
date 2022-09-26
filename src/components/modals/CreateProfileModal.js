import { useNavigate } from "react-router-dom";
import createProfile from "../../LensProtocol/profile/Create_Profile";
import React, { useState } from "react";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { profile } from "../../LensProtocol/profile/get-profile";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import { LensAuthContext } from "../../context/LensContext";
import { toast } from "react-toastify";

const auth =
  "Basic " +
  Buffer.from(
    process.env.REACT_APP_INFURA_PID + ":" + process.env.REACT_APP_INFURA_SECRET
  ).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: 'white',
  background: 'linear-gradient(to right top, #ff0f7b, #ff3d61, #ff6049, #ff7f36, #f89b29);',
  '&:hover': {
    background: 'linear-gradient(to left top, #ff0f7b, #ff3d61, #ff6049, #ff7f36, #f89b29);',
  },
}));


export default function ProfileCreation() {
  const lensAuthContext = React.useContext(LensAuthContext);
  const { profile, loginCreate, disconnectWallet, update, setUpdate, userAdd } = lensAuthContext;

  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const ipfsResult = await client.add(file);
    const imageURI = `https://superfun.infura-ipfs.io/ipfs/${ipfsResult.path}`;
    setFile(imageURI);

  }




  const [handle, setHandle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  var forbiddenCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,`<>/?]+/;

  const handleSubmit = async (event) => {

    // const ss= await profile(handle); 
    if (forbiddenCharacter.test(handle)) {
      toast.warning("Special character are not allowed.");
      return false;
    } else if (handle.includes(' ')) {
      toast.error("Spaces are not allowed.");
      return false;
    }
    setIsLoading(true);
    const handleData = {
      handle: handle,
      url: file,
      address: userAdd,
      login: loginCreate
    }
    const result = await createProfile(handleData);

    if (result === false) {
      setIsLoading(false);
    } else {
      setUpdate(!update);
      toast.success("profile created!!!")
      setIsLoading(false);
    }
    setOpen(false); 
    return true;
  };

  return (
    <div>
      < MenuItem onClick={handleClickOpen} className='m-2'  >  Create Profile</MenuItem>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create Profile</DialogTitle>
        <DialogContent>
          <div className="flex items-center mt-2" style={{ border: '1px solid white', borderRadius: '6px' }}>
            <input
              onChange={(e) => handleUploadImage(e)}
              type="file"
              name="file"
              id="file"
              className="input-file d-none" />
            <label
              htmlFor="file"
              style={{ width: '100%', cursor: 'pointer' }}
              className="rounded-3 text-center    js-labelFile p-2 my-2 w-20  "
            >
              <CloudUploadIcon />
              <p className="js-fileName">
                Upload Profile(PNG, JPG, GIF)
              </p>
            </label>
          </div>


          <TextField onChange={(e) => setHandle(e.target.value)} className='my-2' id="outlined-basic" label="Handle" variant="outlined" fullWidth placeholder='@handle' />
        </DialogContent>
        <DialogActions>
          <ColorButton onClick={handleClose}>Cancel</ColorButton>
          <ColorButton onClick={handleSubmit}>{isLoading ? <CircularProgress /> : "Create Profile"}</ColorButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}