import { Card, CardContent, Chip, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import FlagIcon from '@mui/icons-material/Flag';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function Prizes(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        props.data && props.data.map((e) => {
            setTitle(e.name);
            setDescription(e.description);
        })
    }, [props])

    return (
        < >
            <div className='col mt-4'>
                <Typography variant='h5'>{title}</Typography>
                <Typography variant='body' color="text.secondary">{description}</Typography>

                <Typography variant='h6' className='mt-4'>Prizes</Typography>
                <Typography variant='body' component="div" color="text.secondary"><span style={{ color:'white',fontWeight: 'bolder' }}> 1st Place : </span>
                    $700
                </Typography>
                <Typography variant='body' component="div" color="text.secondary"><span style={{ color:'white',fontWeight: 'bolder' }}> 2nd Place : </span>
                    $500
                </Typography> 
                <Typography variant='body' component="div" color="text.secondary"><span style={{ color:'white',fontWeight: 'bolder' }}> 3rd Place : </span>
                    $300
                </Typography>
                <Typography variant='body' component="div" color="text.secondary"><span style={{ color:'white',fontWeight: 'bolder' }}> 4th Place : </span>
                    $200
                </Typography>
                <Typography variant='body' component="div" color="text.secondary"><span style={{ color:'white',fontWeight: 'bolder' }}> 5th Place : </span>
                    $100
                </Typography>


                <Card sx={{ maxWidth: 345, margin: '20px 0' }} >

                    <CardContent >
                        <Typography gutterBottom variant="body2" color="text.secondary">
                            10 days left
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            <CalendarMonthIcon style={{ fontSize: '20px' }} /> 10 Aug - 20 Aug
                        </Typography>

                        <Divider style={{ border: '0.5px solid white', margin: '5px 0' }} />

                        <div className='d-flex justify-content-between'>
                            <Typography gutterBottom variant="body" color="text.secondary">
                                <span style={{ color: '#fff ' }}>$1000</span> in Prizes
                            </Typography>
                            <Typography gutterBottom variant="body" color="text.secondary">
                                <span style={{ color: '#fff ' }}>1034</span>  participants
                            </Typography>
                        </div>
                        <Divider style={{ border: '0.5px solid white', margin: '5px 0' }} />
                        <Typography gutterBottom variant="h6" component="div">
                            <FlagIcon style={{ fontSize: '20px' }} />  <Chip label="Polygon" variant="outlined" />
                        </Typography>

                        <Typography gutterBottom variant="h6" component="div">
                            <LocalOfferIcon style={{ fontSize: '20px' }} />  <Chip label="Meme" variant="outlined" /> <Chip label="crypto" variant="outlined" /> <Chip label="Polygon" variant="outlined" />
                        </Typography>

                    </CardContent>
                </Card>

            </div>

        </ >
    )
}
export default Prizes