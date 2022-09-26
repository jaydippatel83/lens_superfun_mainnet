import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { CircularProgress, InputBase, MenuItem } from '@mui/material';
import { YouTube } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { createPost } from '../../LensProtocol/post/create-post';
import { LensAuthContext } from '../../context/LensContext';
import { Buffer } from 'buffer';
import { Web3Storage } from 'web3.storage';
import axios from 'axios'; 
import { v4 as uuidv4 } from 'uuid';

// import { create as ipfsHttpClient } from "ipfs-http-client"; 
import { create } from 'ipfs-http-client';  
import { setProfileMetadata } from '../../LensProtocol/profile/update-profile/set-update-profile-metadata';
import { toast } from 'react-toastify';

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
// const client = ipfsHttpClient('https://2DIKlkyA71zoQOZD912IAmpaZjk:38a490f2dde76d9ce0cbf0a9143a6b01@filecoin.infura.io');

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    background: 'linear-gradient(to right top, #ff0f7b, #ff3d61, #ff6049, #ff7f36, #f89b29);',
    '&:hover': {
        background: 'linear-gradient(to left top, #ff0f7b, #ff3d61, #ff6049, #ff7f36, #f89b29);',
    },
}));

export default function UpdateProfile() {
    const lensAuthContext = React.useContext(LensAuthContext);
    const { profile, loginCreate, disconnectWallet, update, setUpdate,userAdd } = lensAuthContext;
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [bio, setBio] = React.useState("");
    const [file, setFile] = React.useState("");
    const [loading, setLoading] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

     
 
    const handleUpload = async () => { 
        setLoading(true);
        const updateData = {
            bio: bio,
            photo: file, 
            login: loginCreate,
            name: name,
            profileId: profile.id,
            address: userAdd
        } 
        const res = await setProfileMetadata(updateData); 
        toast.success("Profile is Updated!");
        setUpdate(!update);
        setLoading(false);
        setOpen(false);
    }
 

   

    const handleUploadImage = async (e) => { 
        const file = e.target.files[0]; 
        const ipfsResult = await client.add(file); 
        const imageURI =`https://superfun.infura-ipfs.io/ipfs/${ipfsResult.path}`;
        setFile(imageURI);  
    }

    return (
        <div>
            <MenuItem className='m-2' onClick={handleClickOpen}  >Edit Profile</ MenuItem>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField onChange={(e) => setName(e.target.value)} className='mt-2' id="outlined-basic" label="Name" variant="outlined" fullWidth />
                    </DialogContentText>

                    <TextField onChange={(e) => setBio(e.target.value)} className='mt-2' id="outlined-basic" label="Bio" variant="outlined" fullWidth />

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
                                Upload Cover Photo(PNG, JPG, GIF)
                            </p>
                        </label>
                    </div> 
                </DialogContent>
                <DialogActions>
                    <ColorButton onClick={handleClose}>Cancel</ColorButton>
                    <ColorButton onClick={handleUpload}>{loading ?  <CircularProgress/> : "Upload"}</ColorButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}
