import { Avatar, Card, CardHeader } from '@mui/material'
import React from 'react'

export default function Participants(props) {
    return (
        <div className='row'>
            {
                props.data && props.data.map((e) => {
                    return (
                        <div className='col-sm-4 col-md-4 col-lg-4 mt-3'>
                            <Card >
                                <CardHeader
                                    avatar={
                                        <Avatar  src={e.img} aria-label="recipe"> 
                                        </Avatar>
                                    } 
                                    title={e.name}
                                    subheader={e.description}
                                />
                            </Card>


                        </div>
                    )
                })
            }

        </div>
    )
}
