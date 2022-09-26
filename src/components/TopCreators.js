import { Avatar, Box, Button, CircularProgress, Divider, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import Slider from 'react-slick';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase/firebase';

import Blockies from 'react-blockies'
import { exploreProfile } from '../LensProtocol/profile/explore-profiles';
import { getPublicationByUser } from '../LensProtocol/post/explore/explore-publications';
 
function TopCreators() {

    const [story, setStory] = useState([]);


    useEffect(() => {
        async function getCreator() {
        var arry = [];
        var user = [];

            const res = await exploreProfile(); 
            // setStory(res.exploreProfiles.items);
            const dd= await getPublicationByUser(); 
            dd.data.explorePublications.items && dd.data.explorePublications.items.map((e)=>{ 
                if(e.__typename == "Comment"){
                    user.push(e.mainPost.profile);
                }else if (e.__typename == "Mirror"){
                    user.push(e.mirrorOf.profile);
                }else{
                    user.push(e.profile);
                }
            })
            setStory(user)
            const q = query(collection(db, "profiles")); 
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => { 
                arry.push(doc.data())
            }); 
        // setStory(arry);

        }
        getCreator()
    }, [])
  
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 8,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };
  
  const replaceUrl=(e)=>{
    const str = e && e.startsWith("ipfs://"); 
    if(str){
        const res = 'https://superfun.infura-ipfs.io/ipfs/' + e.slice(7); 
        return res;
    }
    return e; 
  }


    return (
        <div className='container mt-4' >
            <div className='row'>
                <div className='col mt-5'>
                    <div className="d-flex justify-content-between mb-2">
                        <h5>Newly Joined</h5>
                        <Button component={RouterLink} to="/memers">View All</Button>
                    </div>
                    {
                        story.length == 0  && <Box sx={{ display: 'flex',justifyContent:'center' }}>
                            <CircularProgress />
                        </Box>
                    }
                    {
                        story == undefined  && <Box sx={{ display: 'flex',justifyContent:'center' }}>
                            <h4>No data Available</h4>
                        </Box>
                    }
                    <Slider {...settings}>
                        {
                           story && story.filter((x,i,a)=> a.indexOf(x)==i).map((e) => {  
                                return (
                                    <div key={e.id}>
                                        <Link
                                            to={`/profile/${e.id}`}
                                            state={{ Profile: e }}
                                            params={{ e }}
                                            color="inherit"
                                            underline="hover"
                                            component={RouterLink}
                                        >
                                            <div className="story" style={{ backgroundImage: `linear-gradient(360deg, rgba(255,255,255,1) 50%, rgba(11,11,11,0) 50%), url(${e.picture != null ? replaceUrl(e?.picture?.original?.url) : 'assets/bg.png'})` }}>

                                                <Avatar src={e.picture != null ? replaceUrl(e?.picture?.original?.url)  : 'assets/bg.png'} className="storyAvatar" />
                                                
                                                <h4>{e.handle}</h4>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </div>

        </div>

    )
}

export default TopCreators