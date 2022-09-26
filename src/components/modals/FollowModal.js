import * as React from 'react';
import Button from '@mui/material/Button'; 
import Dialog from '@mui/material/Dialog'; 
import DialogContent from '@mui/material/DialogContent'; 
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Avatar, CircularProgress, Divider, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
 
import CloseIcon from '@mui/icons-material/Close';
 
 
import { following } from '../../LensProtocol/follow/following';
import { followers } from '../../LensProtocol/follow/follower';

 
export default function FollowModal(props) {  
    const [followerData, setFollowerData] = React.useState([]);
    const [followingData, setFollowingData] = React.useState([]);



    React.useEffect(() => {
        if (props.title == 'Following') {
            getFollowing();
        } else {
            getFollowers();
        }
    }, [props])

    async function getFollowing() {
        const res = await following(props.data.ownedBy);
        setFollowingData(res.data.following.items) 
    }

    async function getFollowers() {
        const res = await followers(props.data.id); 
        setFollowerData(res.data.followers.items)
    }

    const shortAddress = (addr) =>
        addr.length > 10 && addr.startsWith('0x')
            ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
            : addr
 

    return (
        <div>
            {/* <Button className='m-2' style={{ background: '#F66A24', color: 'white', textTransform: 'capitalize' }} onClick={handleClickOpen}  >Edit Profile</ Button> */}
            <Dialog open={props.open} onClose={props.close} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ m: 0, p: 2 }}>{props.title}

                    <IconButton
                        aria-label="close"
                        onClick={props.close}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                </DialogTitle>
                <Divider />
                <DialogContent sx={{height: {xs:'200px',sm:'250px',md:'350px',lg:'400px'}, overflow:'scroll'}}>
                    <List sx={{ pt: 0 }}>
                        {
                          props.title == "Following" &&  followingData.length != 0 && followingData.map((e) => {
                                return (
                                    <ListItem button key={e.profile.id}>
                                        <ListItemAvatar>
                                            <Avatar   src={e.profile.picture != null ? e.profile.picture.original && e.profile.picture.original.url : 'https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF'}>

                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={e.profile.handle} />
                                    </ListItem>

                                )
                            })  
                        }
                        {
                           props.title == "Followers" &&  followerData.length != 0 && followerData.map((e) => {
                                return (
                                    <ListItem button >
                                        <ListItemAvatar>
                                            <Avatar   src={e.defaultProfile != null ? e.defaultProfile : 'https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF'}>

                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={shortAddress(e.wallet.address)} />
                                    </ListItem>

                                )
                            })  
                        }
                        {
                            props.title == "Followers" &&  followerData.length === 0 && <h4>doesn’t follow anyone.</h4>
                        }
                        {
                            props.title == "Following" &&  followingData.length === 0 && <h4>doesn’t follow anyone.</h4>
                        }
                    </List>

                </DialogContent>
            </Dialog>
        </div>
    );
}
