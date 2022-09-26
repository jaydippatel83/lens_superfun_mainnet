import { Box, Button, IconButton, ImageList, ImageListItem, ImageListItemBar, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import Header from '../../header/Header'
import Search from '../Search'
import LinkIcon from '@mui/icons-material/Link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useTheme } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ContestCard from '../Cards/ContestCard';
import CreateContestModal from '../modals/CreateContestModal';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 1}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function ContestList() {
    const navigate = useNavigate();
    const theme = useTheme();
    const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
    const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const xsmall = useMediaQuery(theme.breakpoints.down("xs"));


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    const storyData = [
        {
            name: "Jaydip Patel",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNTBiIBka08VQlJa_2LMCkrZKqZ7fT-PV_zw&usqp=CAU",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago'
        },
        {
            name: "Mansi Joshi",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2AnKOLhLgzlFjwD4nLP21BDjglT43XsVwJQ&usqp=CAU",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '4 day ago'
        },
        {
            name: "Disha Sathwara",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgWkh-FmK4k2h4a0dVk9FDO14869w7TjqwyA&usqp=CAU",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago',
        },
        {
            name: "Dhruv Sathwara",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDXiKxCdCFAZverAZZPHT77HqndAlgTEtncg&usqp=CAU",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago'
        },
        {
            name: "Karan Pujara",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTScPSEyda4ZdKgzlMZpIjmCoa6Hyt8xVBNeg&usqp=CAU",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago'
        },
        {
            name: "Web3Builder",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPQGFlovSwUJsdCOFZYqKxiGTy9aBjCLmQVw&usqp=CAU",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago'
        },
        {
            name: "CryptoYard",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRIuplMPz5muZkszIGtUUO0H7XkCw5gxhTew&usqp=CAU",
            description: "21 GIFs From the Second Truss–Sunak Tory Leadership Debate",
            date: '3 day ago'
        },
        {
            name: "CrypticDev",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4meNTJr3kzXWPMkCAjzkTNXeD3Ys8LBfGPziN_epUuBsbmG9PTCMux02sno7Tm6TKspA&usqp=CAU",
            description: "Apologies Aren’t Enough, We Need Reparations Apologies Aren’t Enough, We Need Reparations"
        },
        {
            name: "CryptoPunk",
            img: "https://g.foolcdn.com/art/companylogos/square/link.png",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago'
        },
        {
            name: "Vitalik",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbJbf16Wo-44LjPMWnx9UPvA11MzO8_0igDw&usqp=CAU",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago'
        },
        {
            name: "Polygon",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIB9Rv-Q2c3sp_1N-bKK0EspLRtR5Y45iJUA&usqp=CAU",
            description: "A Showdown Over Abortion Access Is Unfolding In Kansas",
            date: '3 day ago'
        }
    ]

    const [style, setStyle] = useState("");

    const handleNavigate = (e) => { 
        navigate(`/contestDetails${e.name}`)
    }


    return (
        <>
            <Header />
            <div className='footer-position' style={{ marginTop: '100px' }}>
                <div className='container'>
                    <div className='row'>

                        <div className='col-12'>
                            <div className="d-flex justify-content-end mb-2">
                                <CreateContestModal/>
                                {/* < Button className='m-2' style={{ background: '#488E72', color: 'white', textTransform: 'capitalize' }}><AddIcon /> Create Contest</Button> */}
                            </div>
                        </div>
                        <div className='col-12'>
                            <Box sx={{ width: '100%',p:0 }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="All" {...a11yProps(0)} />
                                        <Tab label="Participated" {...a11yProps(1)} />
                                        <Tab label="Created" {...a11yProps(2)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={value} index={0} className="p-0">
                                    {/* <div className='container'> */}
                                        <div className='row p-0'>
                                        {
                                     storyData && storyData.map((e)=>(
                                        <ContestCard data={e}/>
                                     ))   
                                    }
                                        {/* </div> */}
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    Participated
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    Created
                                </TabPanel>
                            </Box>
                        </div>  
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContestList