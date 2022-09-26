import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Typography } from '@mui/material'; 
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'; 
import { postsByMirror } from '../../LensProtocol/post/get-post';
import CollectComponent from '../publications/CollectComponent';
import MirrorComponent from '../publications/MirrorComponent';  
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Profile_Likes from './Profile_Likes';
import { Box } from '@mui/system';

function Profile_Mirror(props) { 
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [update, setUpdate] = useState(false); 
    const [likeUp, setLikeUp] = useState(false);

    useEffect(() => {
        getComments(); 
    }, [props.user])

    async function getComments() {
        const data = await postsByMirror(props.user.id)  
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
                         <h4>No Mirrors Available!</h4>
                    </Box>
                }
                {
                    data && data.map((item) => { 
                        console.log(item,"item");
                        return (
                            <Card key={item.id}  style={{margin:'10px 0'}} >
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            src={item.__typename === "Mirror" ?
                                                item.mirrorOf.profile.picture != null &&
                                                item.mirrorOf.profile.picture.original.url :
                                                item.profile.picture != null ? item.profile.picture.original.url :
                                                    'https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF'} aria-label="recipe">

                                        </Avatar>
                                    }
                                    title={item.__typename === "Mirror" ? item.mirrorOf.metadata.name : item.metadata.name}
                                    subheader={moment(item.createdAt).format('LLL')}

                                />
                                <CardMedia
                                  onClick={() => handleNavigate(item.mirrorOf)} 
                                    component="img"
                                    image={item.__typename === "Mirror" ? item.mirrorOf.metadata.media[0].original.url : item.metadata.media[0].original.url}
                                    alt={item.__typename === "Mirror" ? item.mirrorOf.metadata.name : item.metadata.name}
                                    sx={{ objectFit: 'fill', maxHeight: { lg: '350px', md: '300px', sm: '260px', xs: '200px' } }}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary" className='p-0'>
                                        {item.__typename === "Mirror" ? item.mirrorOf.metadata.description : item.metadata.description}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                <Profile_Likes data={item}/> 

                                    <div
                                        className="d-flex align-items-center"
                                        style={{ color: 'white', padding: '2px', margin: '0 5px', cursor: 'pointer' }}
                                    >
                                        < ModeCommentOutlinedIcon /> {item !== undefined && item?.mirrorOf?.stats?.totalAmountOfComments}
                                        <span className="d-none-xss m-2">Comment</span>
                                    </div>
                                    <MirrorComponent data={item !== undefined && item.mirrorOf} update={update} setUpdate={setUpdate} />
                                    <CollectComponent data={item !== undefined && item.mirrorOf} update={update} setUpdate={setUpdate} />
                                </CardActions> 
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile_Mirror