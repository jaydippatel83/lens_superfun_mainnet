import { Send } from '@mui/icons-material';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Divider, IconButton, InputBase, Typography } from '@mui/material';
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase';
import { postsByComment } from '../../LensProtocol/post/get-post';
import CollectComponent from '../publications/CollectComponent';
import MirrorComponent from '../publications/MirrorComponent';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { useNavigate } from 'react-router-dom';
import Profile_Likes from './Profile_Likes';
import { Box } from '@mui/system';

function Profile_comment(props) {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [update, setUpdate] = useState(false); 

    useEffect(() => {
        getComments(); 
    }, [props])

    async function getComments() {
        const data = await postsByComment(props.user.id)
        setData(data.data.publications.items);
    } 
    
    const handleNavigate = (item) => {
        navigate(`/trendingDetails/${item.id}`)
    }


    return (
        <div className='row'>
            <div className='col'>
                {
                    data == undefined && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                }
                 {
                     data?.length  == 0 && <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                         <h4>No Comments Available!</h4>
                    </Box>
                }
                {
                    data && data.map((item) => { 
                        return (
                            <Card key={item.id} style={{ margin: '10px 0' }} >
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            src={item.__typename === "Comment" ?
                                                item.mainPost.profile.picture != null &&
                                                item.mainPost.profile.picture.original.url :
                                                item.profile.picture != null ? item.profile.picture.original.url :
                                                    'https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF'} aria-label="recipe">

                                        </Avatar>
                                    }
                                    title={item.__typename === "Comment" ? item.mainPost.metadata.name : item.metadata.name}
                                    subheader={moment(item.createdAt).format('LLL')}

                                />
                                <CardMedia
                                    onClick={() => handleNavigate(item.mainPost)}
                                    component="img"
                                    image={item.__typename === "Comment" ? item.mainPost.metadata.media[0].original.url : item.metadata.media[0].original.url}
                                    alt={item.__typename === "Comment" ? item.mainPost.metadata.name : item.metadata.name}
                                    sx={{ objectFit: 'fill', maxHeight: { lg: '350px', md: '300px', sm: '260px', xs: '200px' } }}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary" className='p-0'>
                                        {item.__typename === "Comment" ? item.mainPost.metadata.description : item.metadata.description}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <Profile_Likes data={item} />
                                    <div
                                        className="d-flex align-items-center"
                                        style={{ color: 'white', padding: '2px', margin: '0 5px', cursor: 'pointer' }}
                                    >
                                        < ModeCommentOutlinedIcon /> {item !== undefined && item?.mainPost?.stats?.totalAmountOfComments}
                                        <span className="d-none-xss m-2">Comment</span>
                                    </div>
                                    <MirrorComponent data={item !== undefined && item.mainPost} update={update} setUpdate={setUpdate} />
                                    <CollectComponent data={item !== undefined && item.mainPost} update={update} setUpdate={setUpdate} />
                                </CardActions>
                                <Divider flexItem orientation="horizontal" style={{ border: '1px solid white' }} />

                                <div className='m-2' style={{ maxHeight: '300px', overflowY: 'scroll' }}>

                                    <div style={{ margin: '20px' }}>
                                        <div className="p-0 d-flex " style={{ padding: '10px' }}>
                                            <Avatar src={item.__typename === "Comment" ? item.profile?.picture?.original?.url : 'https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF'} />
                                            <p className='mb-0 align-self-center ml-2'>{item.__typename === "Comment" ? item.profile.handle : item.profile.handle}</p>
                                        </div>
                                        <p style={{
                                            padding: '10px',
                                            background: '#000',
                                            borderRadius: '14px',
                                            margin: '5px',
                                            width: 'fit-content'
                                        }}>{item.__typename === "Comment" && item.metadata.content}</p>
                                        <Divider />                        </div>

                                </div>

                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile_comment