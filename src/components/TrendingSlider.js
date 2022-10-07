import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Button, CircularProgress } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { LensAuthContext } from "../context/LensContext";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebase";



export default function TrendingSlider() {
    const navigate = useNavigate();
    const [post, setPost]= useState([]);

    const lensAuthContext = React.useContext(LensAuthContext);
    const { userPosts } = lensAuthContext;

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const [style, setStyle] = useState("");

    const handleNavigate = (id) => {
        navigate(`/trendingDetails/${id}`)
    }

    const replaceUrl = (e) => {
        const str = e && e.startsWith("ipfs://"); 
        if (str) {
            const res = 'https://superfun.infura-ipfs.io/ipfs/' + e.slice(7);
            console.log(res,"res");
            return res;
        }
        return e;
    }

    useEffect(() => {
        var arr = [];
        userPosts && userPosts.map((e) => { 
            const ss = e?.metadata?.media; 
            if (ss.length != 0) {
                arr.push(e);
            }
        })
        setPost(arr);
    }, [userPosts])


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col mt-4 mb-2">
                    <div className="d-flex justify-content-between mb-2">
                        <h5>Trendings</h5>
                        <Button component={RouterLink} to="/trending">View All</Button>
                    </div>
                    {
                        post.length == 0 && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    }
                    <Slider {...settings}>

                        {post && post.slice(0, 12).map((item) => { 
                            return (
                                <ImageListItem
                                    key={item.id}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleNavigate(item.id)}
                                    onMouseEnter={e => {
                                        setStyle(item.id);
                                    }}
                                    onMouseLeave={e => {
                                        setStyle("");
                                    }}
                                >
                                    <img
                                        src={`${item.mainPost ? replaceUrl(item?.mainPost?.metadata?.media[0]?.original?.url) : replaceUrl(item?.metadata?.media[0]?.original?.url)} `}
                                        srcSet={`${item.mainPost ? replaceUrl(item?.mainPost?.metadata?.media[0]?.original?.url) : replaceUrl(item?.metadata?.media[0]?.original?.url)} `}
                                        alt="superfun"
                                        loading="lazy"

                                        width="100%" style={{ borderRadius: '20px', height: '200px', padding: '10px', cursor: 'pointer', objectFit: 'fill' }}
                                    />
                                    {
                                        style === item.id && <ImageListItemBar
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
                                        style === item.id && <ImageListItemBar
                                            sx={{
                                                background:
                                                    'linear-gradient(to bottom, rgba(0,0,0,0) 0%, ' +
                                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                            }}

                                            position="bottom"
                                            actionIcon={
                                                <img
                                                    src={`${item?.profile?.picture != null ? replaceUrl(item?.profile?.picture?.original?.url) : "https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF"} `}
                                                    alt={item?.metadata?.name}
                                                    loading="lazy"
                                                    width="50" style={{ borderRadius: '20px', height: '50px', padding: '10px', margin: '15px' }}
                                                />

                                            }
                                            actionPosition="left"
                                        />
                                    }
                                    {
                                        style === item.id && <ImageListItemBar
                                            sx={{
                                                background:
                                                    'linear-gradient(to bottom, rgba(0,0,0,0) 0%, ' +
                                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                            }}

                                            position="bottom"
                                            actionIcon={
                                                <IconButton
                                                    sx={{ color: 'white', padding: '5px', margin: '10px 15px' }}
                                                    aria-label={`star ${item.mainPost ? item.mainPost.metadata.description : item.metadata.description}`}
                                                >
                                                    <LinkIcon />
                                                </IconButton>
                                            }
                                            actionPosition="right"
                                        />

                                    }
                                </ImageListItem>
                            );
                        })}

                    </Slider>
                </div>
            </div>
        </div>
    );
}
