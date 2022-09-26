import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Divider, IconButton, InputBase, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../header/Header';
import Search from '../Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
 
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Send } from '@mui/icons-material';
import { profileById } from '../../context/query';

const sliderData = [
  {
    name: "Slider0",
    img: "https://media.giphy.com/media/3o6YgrDPMg1pa2kV0s/giphy.gif"
  },
  {
    name: "Slider1",
    img: "https://media.giphy.com/media/uk4Va5MkRp2bfkOk6f/giphy.gif"
  },
  // {
  //   name: "Slider2",
  //   img: "https://media.giphy.com/media/t56wjBdpeFNwxQglmJ/giphy.gif"
  // },
  // {
  //   name: "Slider3",
  //   img: "https://media.giphy.com/media/MCeIiRETfwBK2rtGRi/giphy.gif"
  // },
  // {
  //   name: "Slider4",
  //   img: "https://media.giphy.com/media/fvr9cMCOqerIpC4Ipm/giphy.gif"
  // },
  // {
  //   name: "Slider5",
  //   img: "https://media.giphy.com/media/mguPrVJAnEHIY/giphy.gif"
  // },
  // {
  //   name: "Slider6",
  //   img: "https://media.giphy.com/media/mguPrVJAnEHIY/giphy.gif"
  // },
  // {
  //   name: "Slider7",
  //   img: "https://media.giphy.com/media/iJJ6E58EttmFqgLo96/giphy.gif"
  // },
  // {
  //   name: "Slider8",
  //   img: "https://media.giphy.com/media/pynZagVcYxVUk/giphy.gif"
  // },
  // {
  //   name: "Slider9",
  //   img: "https://media.giphy.com/media/3NtY188QaxDdC/giphy.gif"
  // },
  // {
  //   name: "Slider10",
  //   img: "https://media.giphy.com/media/srV1WPgHVbDal3UJ9h/giphy.gif"
  // }
]
const tags = [
  "#tuesday ",
  "#happy tuesday",
  "#doggies ",
  " #happy tuesday morning",
  " #happy tuesday good morning",
  " #good tuesday morning"
]
function ProfileDetails() {
  const [data, setData] = useState(); 
  const [detail, setDetail] = useState();
  const [showComment, setShowComment] = useState(false);
  const [comment, setComments] = React.useState([""]);

  const param = useParams();  

  useEffect(() => { 
    async function getProfile() { 
      if (param.id !== null) {
        const user = await profileById(param.id);
        setData(user);
      }

    };
    getProfile(); 
  }, [param]) 

  const handleNavigate = (data) => {
    setDetail(data); 
  }
 

  const handleShowComment = () => {
    setShowComment(!showComment);
  };


  return (
    <>
      <Header />
      <Box className='footer-position' sx={{ marginTop: { sx: '20px', sm: '50px', md: '100px' } }}>
        <Search />
        <div className='container'>
          {/* <div className='row mt-5'> */}
          <div className='row mt-5'>
            {
              detail === undefined && data ? data.map((e) => (
                <div key={e.name} className='col-12 col-sm-7 col-md-7 col-lg-7' style={{ margin: '10px 0' }}>
                  <Card   >
                    <CardHeader
                      avatar={
                        <Avatar src={e.img} aria-label="recipe">

                        </Avatar>
                      }
                      title={e.name} 
                    />
                    <CardMedia
                      component="img"
                      image={e.img}
                      alt={e.name}
                      // sx={{ height: { xs: '200px', sm: '250px', md: '300px', lg: '450px' } }}
                    />
                    <CardContent>
                      {/* <Typography variant="body2" color="text.secondary">
                        {e.description}
                      </Typography> */}
                    </CardContent>
                    <CardActions disableSpacing>
                    <div 
                        className="d-flex align-items-center"
                        style={{ color: 'white', padding: '5px', margin: '10px', cursor: 'pointer' }}
                      >
                        <FavoriteBorderIcon />
                        <span className="d-none-xss">Likes</span>
                      </div>

                      <div
                        onClick={handleShowComment}
                        className="d-flex align-items-center"
                        style={{ color: 'white', padding: '5px', margin: '10px', cursor: 'pointer' }}
                      >
                        < ModeCommentOutlinedIcon />
                        <span className="d-none-xss">Comment</span>
                      </div>

                      <IconButton
                        sx={{ color: 'white', padding: '5px', margin: '10px' }}
                      >
                        < ShareOutlinedIcon />
                      </IconButton>
                      <label>Share</label>
                    </CardActions>

                    <Divider flexItem orientation="horizontal" style={{border:'1px solid white' }} />
                    {showComment ? (
                      <div className='m-2'>
                        <div className="d-flex justify-content-around mt-2">
                          <div className="p-0">
                             <Avatar src={detail && detail.img}/>
                          </div>
                          <form className="col-10 header-search ms-3 d-flex align-items-center">
                            <div className="input-group" style={{ background: 'white',borderRadius:'14px' }}>
                            <InputBase
                                     onChange={(e) => setComments(e.target.value)}
                                    sx={{ ml: 1, flex: 1, color: 'black'}}
                                    placeholder="Write a comment.."
                                    inputProps={{ 'aria-label': 'Search by memers' }}
                                /> 
                            </div>
                            <IconButton  >
                              <Send  />
                            </IconButton>
                          </form>
                        </div> 
                      </div>
                    ) : (
                      ""
                    )}
                  </Card>
                  {
                    tags.map((e) => (
                      <Chip label={e} style={{ margin: '5px 0' }} variant="outlined" />
                    ))
                  }
                </div>
              )) :
                <div className='col-12 col-sm-7 col-md-7 col-lg-7' style={{ margin: '10px 0' }}>
                  <Card   >
                  <CardHeader
                      avatar={
                        <Avatar src={detail && detail.img} aria-label="recipe">

                        </Avatar>
                      }
                      title={detail && detail.name} 
                    />
                    <CardMedia
                      component="img"
                      image={detail && detail.img}
                      alt={ detail && detail.name}
                      // sx={{ height: { xs: '200px', sm: '250px', md: '300px', lg: '450px' } }}
                    />
                    <CardContent>
                      {/* <Typography variant="body2" color="text.secondary">
                    {e.description}
                  </Typography> */}
                    </CardContent>
                    <CardActions disableSpacing>
                    <div 
                        className="d-flex align-items-center"
                        style={{ color: 'white', padding: '5px', margin: '10px', cursor: 'pointer' }}
                      >
                        <FavoriteBorderIcon />
                        <span className="d-none-xss">Likes</span>
                      </div>

                      <div
                        onClick={handleShowComment}
                        className="d-flex align-items-center"
                        style={{ color: 'white', padding: '5px', margin: '10px', cursor: 'pointer' }}
                      >
                        < ModeCommentOutlinedIcon />
                        <span className="d-none-xss">Comment</span>
                      </div>
                       
                      <IconButton
                        sx={{ color: 'white', padding: '5px', margin: '10px' }}
                      >
                        < ShareOutlinedIcon />
                      </IconButton>
                      <label>Share</label>
                    </CardActions>
                    <Divider flexItem orientation="horizontal" style={{border:'1px solid white' }} />
                    {showComment ? (
                      <div className='m-2'>
                        <div className="d-flex justify-content-around mt-2">
                          <div className="p-0">
                             <Avatar src={detail && detail.img}/>
                          </div>
                          <form className="col-10 header-search ms-3 d-flex align-items-center">
                            <div className="input-group" style={{ background: 'white',borderRadius:'14px' }}>
                            <InputBase
                                     onChange={(e) => setComments(e.target.value)}
                                    sx={{ ml: 1, flex: 1, color: 'black'}}
                                    placeholder="Write a comment.."
                                    inputProps={{ 'aria-label': 'Search by memers' }}
                                /> 
                            </div>
                            <IconButton  >
                              <Send  />
                            </IconButton>
                          </form>
                        </div> 
                      </div>
                    ) : (
                      ""
                    )}
                  </Card>
                  {
                    tags.map((e) => (
                      <Chip label={e} style={{ margin: '5px 0' }} variant="outlined" />
                    ))
                  }
                </div>
            }
            {
              sliderData && sliderData.map((e) => {
                if (e.name !== param.id) {
                  return (
                    <div className='col-12 col-sm-5 col-md-5 col-lg-5'>
                      <Card sx={{ margin: '10px 0' }} onClick={() => handleNavigate(e)} >
                        <CardMedia
                          component="img"
                          height="194"
                          image={e.img}
                          alt={e.name}
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">

                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <IconButton aria-label="add to favorites">
                            <FavoriteBorderIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </div>
                  )
                }
                return (
                  <></>
                )
              })
            }
          </div>
        </div>
      </Box>

    </ >
  )
}

export default ProfileDetails