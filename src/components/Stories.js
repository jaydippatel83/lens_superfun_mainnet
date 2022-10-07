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
import useInfiniteScroll from './useInfiniteScroll';
import { getPublicationByUser } from '../LensProtocol/post/explore/explore-publications';


function Stories() {
    const [style, setStyle] = useState("");
    const lensAuthContext = React.useContext(LensAuthContext);
    const { userPosts } = lensAuthContext;
    const [data, setData] = useState();

    const navigate = useNavigate();
   

    const [Items, setItems] = useState([]);
    const [isFetching, setIsFetching] = useState(false); 
    const [page, setPage] = useState("{\"timestamp\":1,\"offset\":0}"); 
    const [HasMore, setHasMore] = useState(true); 
    const [lastElementRef] = useInfiniteScroll(
        HasMore ? loadMoreItems : () => { },
        isFetching
    ); 


    const handleNavigate = (id) => {
        navigate(`/trendingDetails/${id}`)
    }

    useEffect(() => {
        loadMoreItems();
    }, [userPosts])



    async function loadMoreItems() {
        setIsFetching(true);  
        const results = await getPublicationByUser(page).then((res) => { 
                setItems((prevTitles) => {
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


    const replaceUrl = (e) => {
        const str = e && e.startsWith("ipfs://");
        if (str) {
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
                    Items.length == 0 && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                }
                {
                    Items == undefined && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <h4>No data Available</h4>
                    </Box>
                }


                {
                    Items && Items.map((item, i) => { 
                        return (
                            <div ref={lastElementRef} key={i} className='col-12 col-sm-6 col-md-3 col-lg-3 p-2'>
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
                                        srcSet={`${item.mainPost ? replaceUrl(item?.mainPost?.metadata?.media[0]?.original?.url) : replaceUrl(item?.metadata?.media[0]?.original?.url)} `}
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