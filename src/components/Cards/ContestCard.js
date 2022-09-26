import React from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ContestCard(props) {
    const navigate = useNavigate();


    const handleNavigate=(e)=>{ 
        navigate(`/contestDetails${e.name}`)
    }


    return (

        <div className='col-12 col-sm-6 col-md-4 col-lg-4'>
            <Card sx={{ maxWidth: 345, margin: '10px 0' }} >
                <CardMedia
                    component="img"
                    height="194"
                    image={props.data.img}
                    alt={props.data.name}
                />
                <CardContent >
                   <Typography   gutterBottom variant="body2" color="text.secondary">
                   <CalendarMonthIcon style={{fontSize:'20px'}}/> 20 Aug 2022 - 30 Aug 2022
                    </Typography>
                    <Typography  gutterBottom variant="h6" component="div">
                        Polygon  Meme Contest
                    </Typography>

                    <div className='d-flex justify-content-between'>
                    <Typography  gutterBottom variant="body" color="text.secondary">
                        <span style={{color:'#fff '}}>$1000</span> in Prizes
                    </Typography> 
                    <Typography  gutterBottom variant="body" color="text.secondary">
                        <span style={{color:'#fff '}}>1034</span>  participants
                    </Typography> 
                    </div>

                    <Typography className='text-center' variant="body2" color="text.secondary">
                        {props.data.description}
                    </Typography>
                </CardContent>
                <CardActions   className='d-flex justify-content-center m-0 pb-2'>
                < Button   style={{ background: '#488E72', color: 'white', textTransform: 'capitalize' }}>Participate</Button>
                < Button onClick={()=>handleNavigate(props.data)}   style={{ background: '#FFF', color: 'black', textTransform: 'capitalize' }}>Know More</Button>

                </CardActions>
            </Card>
        </div>
    )
}

export default ContestCard