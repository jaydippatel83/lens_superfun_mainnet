import React, { useCallback, useEffect, useState } from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, CircularProgress } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { LensAuthContext } from '../context/LensContext';
import moment from 'moment';
import { Box } from '@mui/system';


function Stories() {
    const [style, setStyle] = useState("");
    const lensAuthContext = React.useContext(LensAuthContext);
    const { userPosts } = lensAuthContext;
    const [data, setData] = useState();

    const navigate = useNavigate();
    // const [storyItem, setStoryItem] = useState(storyData);
    const [hasMore, setHasmore] = useState(true);
    const [lastPosition, setLastPosition] = useState(0);
    const perPage = 4;


    const loadProducts = useCallback(() => {
        setTimeout(() => {
            // setStoryItem((prev) => [...prev, ...prev]);
        }, 500);

        // setLastPosition(lastPosition + perPage);
    }, []);


    const handleNavigate = (id) => {
        navigate(`/trendingDetails/${id}`)
    }

    useEffect(() => {
        var arry = [];
        
        userPosts && userPosts.map((e) => {
            console.log(e, "eee");
            // var rr= e.metadata?.media?.length != 0 && e.metadata?.media[0]?.original?.url;
            // console.log(rr,"rrr");
            // var res = rr.substring(0, 7);
            if (e.metadata?.media?.length != 0) {
                arry.push(e);
            }
        })
        setData(arry);
    }, [userPosts])


    const replaceUrl=(e)=>{
        const str = e && e.startsWith("ipfs://"); 
        if(str){
            const res = 'https://superfun.infura-ipfs.io/ipfs/' + e.slice(7); 
            return res;
        }
        return e; 
      }


    return (

        <div className='container mt-3'>
            <div className='row'>
                <div className="col-12 mt-2 mb-2">
                    <div className="d-flex justify-content-between mb-2">
                        <h5>Memes</h5>
                        <Button component={RouterLink} to="/stories">View All</Button>
                    </div>
                </div>

                {
                    userPosts.length == 0 && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                }
                {
                    userPosts == undefined && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <h4>No data Available</h4>
                    </Box>
                }


                {
                    data && data.map((item, i) => {
                        console.log(item,"item");
                        return (
                            <div className='col-12 col-sm-6 col-md-3 col-lg-3 p-2' key={i}>
                                <ImageListItem
                                    style={{ cursor: 'pointer' }}
                                    onMouseEnter={e => {
                                        setStyle(item.id);
                                    }}
                                    onMouseLeave={e => {
                                        setStyle("");
                                    }}
                                    onClick={() => handleNavigate(item.id)}
                                >
                                    <img
                                        src={`${item.mainPost ? replaceUrl(item?.mainPost?.metadata?.media[0]?.original?.url) : replaceUrl(item?.metadata?.media[0]?.original?.url)} `}
                                        srcSet={`${item.mainPost ? item?.mainPost?.metadata?.media[0]?.original?.url : item?.metadata?.media[0]?.original?.url} `}
                                        alt={item.mainPost ? item?.mainPost?.metadata?.name : item?.metadata?.name}
                                        loading="lazy"
                                        width="100%" style={{ borderRadius: '10px', height: '300px', cursor: 'pointer', objectFit: 'fill' }}
                                    />
                                    {
                                        style == item.id && <ImageListItemBar
                                            sx={{
                                                background:
                                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                            }}
                                            position="top"
                                            actionIcon={
                                                <IconButton
                                                    sx={{ color: 'white', padding: '5px', margin: '10px' }}
                                                >
                                                    <FavoriteBorderIcon />
                                                </IconButton>
                                            }
                                            actionPosition="right"
                                        />
                                    }
                                    {
                                        style == item.id && <ImageListItemBar
                                            sx={{
                                                background:
                                                    'linear-gradient(to bottom, rgba(0,0,0,0) 0%, ' +
                                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                            }}

                                            position="top"
                                            actionIcon={
                                                <img
                                                    src={`${item?.profile?.picture != null ? replaceUrl(item?.profile?.picture?.original?.url) : "https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF"} `}
                                                    alt={item?.mainPost ? item?.mainPost?.metadata?.name : item?.metadata?.name}
                                                    loading="lazy"
                                                    width="50" style={{ borderRadius: '20px', height: '50px', padding: '10px', margin: '15px', objectFit: 'fill' }}
                                                />

                                            }
                                            actionPosition="left"
                                        />
                                    }
                                    {
                                        style == item.id && <ImageListItemBar sx={{
                                            background:
                                                'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, ' +
                                                'rgba(0,0,0,0.7) 70%, rgba(0,0,0,0) 100%)',
                                        }}
                                            position="bottom"
                                            actionIcon={
                                                <div className='p-2 mb-0'>
                                                    <p className='mb-0' >{item.metadata.description}</p><span>{moment(item.createdAt).format('LLL')}</span></div>
                                            }
                                            actionPosition="left"
                                        />
                                    }
                                </ImageListItem>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Stories