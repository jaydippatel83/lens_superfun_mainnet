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
import { InputBase } from '@mui/material';
import { YouTube } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    background: 'linear-gradient(to right top, #ff0f7b, #ff3d61, #ff6049, #ff7f36, #f89b29);',
    '&:hover': {
        background: 'linear-gradient(to left top, #ff0f7b, #ff3d61, #ff6049, #ff7f36, #f89b29);',
    },
}));

export default function CreateContestModal() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            < Button onClick={handleClickOpen} className='m-2' style={{ background: '#488E72', color: 'white', textTransform: 'capitalize' }}><AddIcon /> Create Contest</Button>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Create Contest</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField className='mt-2' id="outlined-basic" label="Title" variant="outlined" fullWidth />
                    </DialogContentText>

                    <div className="flex items-center mt-2" style={{ border: '1px solid black', borderRadius: '6px' }}>
                        <input type="file" name="file" id="file" className="input-file d-none" />
                        <label
                            htmlFor="file"
                            style={{ width: '100%', cursor: 'pointer' }}
                            className="rounded-3 text-center    js-labelFile p-2 my-2 w-20  "
                        >
                            <CloudUploadIcon />
                            <p className="js-fileName">
                                Upload Meme(PNG, JPG, GIF, MP4.)
                            </p>
                        </label>
                    </div>

                    <div className="input-group my-2" style={{ background: 'white', borderRadius: '6px' }}>
                        <InputBase
                            sx={{ ml: 1, flex: 1, color: 'black', }}
                            placeholder="Video URL link  "
                            inputProps={{ 'aria-label': 'Search by memers' }}
                        />
                        <ColorButton sx={{ p: '12px' }} endIcon={<YouTube />}>
                        </ColorButton>
                    </div>

                    <TextField className='my-2' id="outlined-basic" label="Add Tags" variant="outlined" fullWidth placeholder='#crypto #gif #meme' />
                </DialogContent>
                <DialogActions>
                    <ColorButton onClick={handleClose}>Cancel</ColorButton>
                    <ColorButton onClick={handleClose}>Upload</ColorButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}
