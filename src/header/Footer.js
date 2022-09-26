import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='container-fluid footer-size' style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <div className='row'>
                <div className='col'>
                    <div className='d-flex justify-content-between' style={{ height: '60px' }}>
                        <p className='align-self-center m-0'>© Copyright 2022. All Rights Reserved.</p>
                        <p className='align-self-center m-0'> Made with Superfun.social</p>
                        <p className='align-self-center m-0 d-flex justify-content-around'>
                           <a  target="_blank" href=''> <FacebookIcon /> </a>
                            <a target="_blank" href="https://twitter.com/SuperFunSocial" ><TwitterIcon /></a> 
                            <a  target="_blank" href=''><InstagramIcon /></a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer