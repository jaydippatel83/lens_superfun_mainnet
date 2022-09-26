import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import { postsByMirror } from '../../LensProtocol/post/get-post';
import CollectComponent from '../publications/CollectComponent';
import MirrorComponent from '../publications/MirrorComponent'; 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

function Profile_Collect(props) { 
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [update, setUpdate] = useState(false);
    const [likeUp, setLikeUp] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        getComments();
        getLikeUp();
    }, [props.user])

    async function getComments() {
        const data = await postsByMirror(props.user.id) 
        console.log(data,"data");
        setData(data.data.publications.items);
    }

    async function getLikeUp(item) {
        const q = query(collection(db, "Reactions"), where("PublicationId", "==", item?.mirrorOf?.id));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            setCount(0);
        }
        querySnapshot.forEach((data) => {
            setCount(data.data().Likes);
        })
    }

    const addReactions = async (data) => {
        const id = window.localStorage.getItem("profileId");
        const q = query(collection(db, "Reactions"), where("PublicationId", "==", data.id));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty === true) {
            const docRef = await addDoc(collection(db, "Reactions"), {
                Likes: 1,
                LikesBy: arrayUnion(id),
                PublicationId: data.id
            });
            setLikeUp(!likeUp);
        } else {
            querySnapshot.forEach(async (react) => {
                const nycRef = doc(db, 'Reactions', react.id);
                react.data().LikesBy.map(async (e) => {
                    if (e === id) {
                        await updateDoc(nycRef, {
                            Likes: react.data().Likes - 1,
                            LikesBy: arrayRemove(id),
                        })
                        setLikeUp(!likeUp);
                    } else if (e !== id) {
                        await updateDoc(nycRef, {
                            Likes: react.data().Likes + 1,
                            LikesBy: arrayUnion(id)
                        })
                        setLikeUp(!likeUp);
                    } else {
                        await updateDoc(nycRef, {
                            Likes: react.data().Likes,
                            LikesBy: react.data().LikesBy
                        })
                        setLikeUp(!likeUp);
                    }
                })

                if (react.data().LikesBy.length === 0) {
                    await updateDoc(nycRef, {
                        Likes: react.data().Likes + 1,
                        LikesBy: arrayUnion(id)
                    })
                    setLikeUp(!likeUp);
                }
            });
        }
    }

    const handleNavigate = (item) => {
        navigate(`/trendingDetails/${item.id}`)
    }
    return (
        <div className='row'>
            <div className='col'>
                {
                    data && data.map((item) => {
                        getLikeUp(item)
                        return (
                            <Card key={item.id}  >
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
                                    <div
                                        className="d-flex align-items-center"
                                        style={{ color: 'white', padding: '2px', margin: '0 5px', cursor: 'pointer' }}
                                        onClick={() => addReactions(item)}
                                    >
                                        <FavoriteBorderIcon /> {count}
                                        <span className="d-none-xss m-2">Likes</span>
                                    </div>

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

export default Profile_Collect