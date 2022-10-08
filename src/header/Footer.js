import React from 'react' 
import TwitterIcon from '@mui/icons-material/Twitter'; 
import { Box } from '@mui/material';

function Footer() {
    return (
        <div className='container-fluid footer-size' style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <div className='row'>
                <div className='col'>
                    <Box
                        style={{
                            position: 'relative',
                            height: '80px',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <p className='align-self-center mb-0 text-center'
                            style={{
                                display: 'flex',
                                margin: '1px',
                                padding: '5px'
                            }}
                        > Made with ❤️ for the community</p>
                        <a style={{
                            fontSize: '30px',
                            position: 'absolute',
                            top: '15px',
                            right: 0,
                        }} target="_blank" href="https://twitter.com/SuperFunSocial" > <TwitterIcon /></a>
                    </Box>
                </div>
            </div>
        </div>
    )
}


export default Footer