import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, CircularProgress, Divider, IconButton, ImageList, ImageListItem, Input, InputBase, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Header from '../../header/Header';
import Search from '../Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { PanoramaSharp, Send } from '@mui/icons-material';
import { profileById } from '../../context/query';
import { LensAuthContext } from '../../context/LensContext';
import { createComment } from '../../LensProtocol/post/comments/create-comment';
import { toast } from 'react-toastify';
import { getPublicationByLatest, getPublicationByUser } from '../../LensProtocol/post/explore/explore-publications';
import { getComments, posts } from '../../LensProtocol/post/get-post';
import { getpublicationById } from '../../LensProtocol/post/get-publicationById';
import { addReaction } from '../../LensProtocol/reactions/add-reaction';
import { getLikes } from '../../LensProtocol/reactions/get-reactions';
import MirrorComponent from '../publications/MirrorComponent';
import CollectComponent from '../publications/CollectComponent';
import { whoCollected } from '../../LensProtocol/post/collect/collect';
import { addDoc, collection, doc, getDocs, query, runTransaction, setDoc, where, writeBatch, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import { useTheme } from '@mui/system';
import useInfiniteScroll from '../useInfiniteScroll';

const tags = [
  "#tuesday ",
  "#happy tuesday",
  "#doggies ",
  " #happy tuesday morning",
  " #happy tuesday good morning",
  " #good tuesday morning"
]
function TrendingDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [detail, setDetail] = useState();
  const [showComment, setShowComment] = useState(false);
  const [comment, setComments] = React.useState("");
  const [loading, setLoading] = useState(false);
  const lensAuthContext = React.useContext(LensAuthContext);
  const [count, setCount] = useState(0);

  const [posts, setPosts] = useState([]);
  const [displayCmt, setDisplayCmt] = useState([]);
  const [update, setUpdate] = useState(false);
  const [likeUp, setLikeUp] = useState(false);
  const [commUp, setCommUp] = useState(false);
  const { profile, userAdd, loginCreate, login } = lensAuthContext;
  const [postCollect, setPostCollect] = useState([]);

  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
  const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const xsmall = useMediaQuery(theme.breakpoints.down("xs"));

  const param = useParams();

  async function get_posts() {
    try {
      const pst = await getpublicationById(param.id);
      setData(pst.data.publication);
      const d = await getPublicationByLatest();
      setPosts(d.data.explorePublications.items);
    } catch (error) {
      toast.error(error);
    }

  }


  useEffect(() => {
    setTimeout(() => {
      getComm();
      get_posts();
      getLikeUp();
    }, 1000);
  }, [param.id, update, data, likeUp, commUp])

  const handleNavigate = (data) => {
    navigate(`/trendingDetails/${data.id}`);
    // setDetail(data);
    // setLikeUp(!likeUp);
  }

  async function getLikeUp() {
    // const id = detail == undefined ? data.id && data.id : detail.id;
    const cId = data !== undefined && data?.id;
    const q = query(collection(db, "Reactions"), where("PublicationId", "==", cId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      setCount(0);
    }
    querySnapshot.forEach((data) => {
      setCount(data.data().Likes);
    })
  }


  const handleShowComment = () => {
    setShowComment(!showComment);
  };

  const [Items, setItems] = useState([]);
    const [isFetching, setIsFetching] = useState(false); 
    const [page, setPage] = useState("{\"timestamp\":1,\"offset\":0}"); 
    const [HasMore, setHasMore] = useState(true); 


    const [lastElementRef] = useInfiniteScroll(
        HasMore ? loadMoreItems : () => { },
        isFetching
    );  
   

    useEffect(() => {
        loadMoreItems();
    }, [])



    async function loadMoreItems() {
        setIsFetching(true);  
        const results = await getPublicationByUser(page).then((res) => { 
          setPosts((prevTitles) => {
                    return [...new Set([...prevTitles, ...res.data.explorePublications.items.map((b) => b)])];
                });
                setPage(res.data.explorePublications.pageInfo.next);
                setHasMore(res.data.explorePublications.items.length > 0);
                setIsFetching(false);
            })
            .catch((e) => {
                console.log(e);
            });
    }



  async function getComm() {

    let arr = [];
    const cmt = await getComments(param.id);
    cmt && cmt.map((com) => {
      let obj = {
        typename: com?.__typename,
        avtar: com?.profile?.picture?.original?.url,
        name: com?.profile?.handle,
        comment: com?.metadata?.content
      }
      arr.push(obj);
    })

    setDisplayCmt(arr);
  }

  const handleComment = async (data) => {
    try {
      let arr = [...displayCmt];
      const id = window.localStorage.getItem("profileId");
      setLoading(true);
      const obj = {
        address: userAdd,
        comment: comment,
        login: loginCreate,
        profileId: id,
        publishId: data.id,
        user: profile.handle
      }
      const result = await createComment(obj);
      if (result) {
        let obj = {
          typename: "Comment",
          avtar: profile?.picture?.original?.url,
          name: profile?.handle,
          comment: comment
        }
        arr[arr.length] = obj;
        setComments("");
        setDisplayCmt(arr)
        // setCommUp(!commUp);
        setLoading(false);

      }
    } catch (error) {
      console.log(error, "errr-----")
    }
  }



  const handleNav = (dd) => {
    navigate(`/profile/${dd}`)
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
  const replaceUrl=(e)=>{
    const str = e && e.startsWith("ipfs://"); 
    if(str){
        const res = 'https://superfun.infura-ipfs.io/ipfs/' + e.slice(7); 
        return res;
    }
    return e; 
  }
 

  return (
    <>
      <Header />
      <Box className='footer-position' sx={{ marginTop: { sx: '20px', sm: '50px', md: '100px' } }}>
        {/* <Search /> */}
        <div className='container'>
          {/* <div className='row mt-5'> */}
          <div className='row mt-5'>

            {
              data == undefined && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            }

            {
              data &&
              <div  className='col-12 col-sm-7 col-md-6 col-lg-6' style={{ margin: '10px 0' }}>
                <Card   >

                  <CardHeader
                    onClick={() => handleNav(data && data.__typename === "Comment" ? data?.mainPost?.profile?.id : data?.profile?.id)}
                    avatar={
                      <Avatar
                        src={data != undefined &&
                          data?.profile?.picture != null ?
                          replaceUrl(data?.profile?.picture?.original?.url) : 'https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF'} aria-label="recipe">

                      </Avatar>
                    }
                    title={data && data.__typename === "Comment" ? data?.mainPost?.metadata?.name : data?.metadata?.name}
                  />

                  <CardMedia
                    component="img"
                    image={data && data.__typename === "Comment" ? replaceUrl(data?.mainPost?.metadata?.media[0]?.original?.url) : replaceUrl(data?.metadata?.media[0]?.original?.url)}
                    alt={data && data.__typename === "Comment" ?  data?.mainPost?.metadata?.name : data?.metadata?.name}
                    sx={{ objectFit: 'fill', maxHeight: { lg: '350px', md: '300px', sm: '260px', xs: '200px' } }}

                  />
                  <CardContent className='p-0 '>
                    <Typography style={{ padding: '0 10px' }} variant="body2" color="text.secondary">
                      {data && data.__typename === "Comment" ? data?.mainPost?.metadata?.content : data?.metadata?.content}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <div
                      className="d-flex align-items-center"
                      style={{ color: 'white', margin: '0 5px', cursor: 'pointer' }}
                      onClick={() => addReactions(data)}
                    >
                      <FavoriteBorderIcon /> {count}
                      <span className="d-none-xss m-1">Likes</span>
                    </div>

                    <div
                      onClick={handleShowComment}
                      className="d-flex align-items-center"
                      style={{ color: 'white', margin: '0 5px', cursor: 'pointer' }}
                    >
                      < ModeCommentOutlinedIcon />  {data && data.stats.totalAmountOfComments}

                      <span className="d-none-xss m-1">Comment</span>
                    </div>
                    <MirrorComponent data={data} update={update} setUpdate={setUpdate} />
                    <CollectComponent data={data} update={update} setUpdate={setUpdate} />
                  </CardActions>

                  <Divider flexItem orientation="horizontal" style={{ border: '1px solid white' }} />
                  {showComment ? (
                    <div className='m-2' style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                      <div className="d-flex justify-content-around mt-2">
                        <div className="p-0">
                          <Avatar src={data ? data.img : "https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF"} />
                        </div>
                        <form className="col-10 header-search ms-3 d-flex align-items-center">
                          <div className="input-group" style={{ background: 'white', borderRadius: '14px' }}>
                            <Input
                              onChange={(e) => setComments(e.target.value)}
                              sx={{ ml: 1, flex: 1, color: 'black' }}
                              placeholder="Write a comment.."

                              value={comment}
                            />
                          </div>
                          <IconButton onClick={() => handleComment(data)} >
                            {loading ? <CircularProgress /> : <Send />}
                          </IconButton>
                        </form>
                      </div>

                      {
                        data !== undefined && displayCmt && displayCmt.map((e) => {
                          return (
                            <div style={{ margin: '10px' }} key={e.id}>
                              <Divider />
                              <div className="p-0 d-flex " style={{ padding: '5px' }}>
                                <Avatar src={e.typename === "Comment" ? e.avtar : 'https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF'} />
                                <p className='mb-0 align-self-center ml-2'>{e.typename === "Comment" ? e.name : e.name}</p>
                              </div>
                              <p style={{
                                padding: '5px 10px',
                                background: '#000',
                                borderRadius: '14px',
                                margin: '5px',
                                width: 'fit-content'
                              }}>{e.typename === "Comment" && e.comment}</p>
                              <Divider />                        </div>
                          )
                        })
                      }

                    </div>
                  ) : (
                    ""
                  )}
                </Card>
                {/* {
                  data?.metadata?.description !== data?.metadata?.content ? data.metadata.description.map((e) => (
                    <Chip label={e} style={{ margin: '5px 0' }} variant="outlined" />
                  )) : <></>
                } */}
              </div>
            }
            <div className='col-12 col-sm-5 col-md-6 col-lg-6' style={{ overflow: 'scroll', maxHeight: "100vh" }}>
              <div className='row'>
                <ImageList variant="masonry" cols={greaterThanMid && 2 || smallToMid && 2 || lessThanSmall && 1 || xsmall && 1} gap={12}>
                  {

                    posts && posts.map((e,i) => {
                      return (
                        <ImageListItem
                        ref={lastElementRef}
                          key={i}
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleNavigate(e)}
                        >
                          <Card sx={{ margin: '10px 0' }}  >
                            <CardMedia
                              component="img"
                              image={e.__typename === "Comment" ? replaceUrl(e?.mainPost?.metadata?.media[0]?.original?.url) : replaceUrl(e?.metadata?.media[0]?.original?.url)}
                              alt={e.__typename === "Comment" ? e?.mainPost?.metadata?.name : e.metadata.name}
                              sx={{ objectFit: 'fill', maxHeight: { lg: '350px', md: '300px', sm: '260px', xs: '230px' } }}
                            />
                            <CardContent>
                              {/* <Typography variant="body2" color="text.secondary" className='mx-2'>
                                {e.__typename === "Comment" ? e?.mainPost?.metadata?.content : e?.metadata?.content}
                              </Typography> */}
                            </CardContent>
                          </Card>
                        </ImageListItem>
                        // <div key={e.id} className='col-12 col-sm-12 col-md-6 col-lg-6'>
                        //   <Card sx={{ margin: '10px 0' }} onClick={() => handleNavigate(e)} >
                        //     <CardMedia
                        //       component="img" 
                        //       image={e.__typename === "Comment" ? e.mainPost.metadata.media[0].original.url : e.metadata.media[0].original.url}
                        //       alt={e.__typename === "Comment" ? e.mainPost.metadata.name : e.metadata.name}
                        //       sx={{ objectFit: 'fill', maxHeight: { lg: '350px', md: '300px', sm: '260px', xs: '230px' } }}
                        //     />
                        //     <CardContent>
                        //       <Typography variant="body2" color="text.secondary" className='mx-2'>
                        //         {e.__typename === "Comment" ? e.mainPost.metadata.content : e.metadata.content}
                        //       </Typography>
                        //     </CardContent>
                        //   </Card>
                        // </div>
                      )
                    })
                  }
                </ImageList>
              </div>
            </div>

          </div>
        </div>
      </Box>

    </ >
  )
}

export default TrendingDetails