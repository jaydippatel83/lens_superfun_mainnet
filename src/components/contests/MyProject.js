 
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button, Chip, Divider } from '@mui/material';
import { FlagCircleOutlined, FlagCircleTwoTone } from '@mui/icons-material';
import FlagIcon from '@mui/icons-material/Flag';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

function MyProject(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        props.data && props.data.map((e) => {
            setTitle(e.img);
            setDescription(e.description);
        })
    }, [props])

    return (
        <div className='row'>
            <div className='col-12 col-sm-6 col-md-7 col-lg-7 mt-4'> 
            <Typography  gutterBottom variant="h4" component="div">
                        My Contest Submissions
                    </Typography>
                <Card sx={{ maxWidth: 345, margin: '10px 0' }} >
                <CardMedia
                    component="img"
                    height="194"
                    image={title}
                    alt={title}
                />
                <CardContent >
                <Chip label="Submitted" variant="outlined" color='primary' />
                    <Typography  gutterBottom variant="h6" component="div">
                       Polygon  Meme Contest
                    </Typography>

                    <Typography  gutterBottom variant="body" color="text.secondary">
                       {description}
                    </Typography> 

                    <Typography className='text-center' variant="body2" color="text.secondary">
                        {props.data.description}
                    </Typography>
                </CardContent> 
            </Card>
               

            </div>
            <div className='col-12 col-sm-6 col-md-5 col-lg-5 mt-4'>
            <Card sx={{ maxWidth: 345, margin: '20px 0' }} >
                     
                     <CardContent >
                         <Typography gutterBottom variant="body2" color="text.secondary">
                             10 days left
                         </Typography>
                         <Typography gutterBottom variant="h6" component="div">
                         <CalendarMonthIcon style={{ fontSize: '20px' }} /> 10 Aug - 20 Aug
                         </Typography>
 
                         <Divider style={{ border:'0.5px solid white', margin:'5px 0'}}/>
 
                         <div className='d-flex justify-content-between'>
                             <Typography gutterBottom variant="body" color="text.secondary">
                                 <span style={{ color: '#fff ' }}>$1000</span> in Prizes
                             </Typography>
                             <Typography gutterBottom variant="body" color="text.secondary">
                                 <span style={{ color: '#fff ' }}>1034</span>  participants
                             </Typography>
                         </div>
                         <Divider style={{ border:'0.5px solid white', margin:'5px 0'}}/>
                         <Typography gutterBottom variant="h6" component="div">
                         <FlagIcon style={{ fontSize: '20px' }} />  <Chip label="Polygon" variant="outlined" />
                         </Typography>
 
                         <Typography gutterBottom variant="h6" component="div">
                         <LocalOfferIcon style={{ fontSize: '20px' }} />  <Chip label="Meme" variant="outlined" /> <Chip label="crypto" variant="outlined" /> <Chip label="Polygon" variant="outlined" />
                         </Typography>
                          
                     </CardContent> 
                 </Card>
            </div>

        </div >
    )
}

export default MyProject