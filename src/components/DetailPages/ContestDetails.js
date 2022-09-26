import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Divider, IconButton, InputBase, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../header/Header';
import Search from '../Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Send } from '@mui/icons-material';
import PropTypes from 'prop-types';
import Overview from '../contests/Overview';
import MyProject from '../contests/MyProject';
import Participants from '../contests/Participants';
import Rules from '../contests/Rules';
import Prizes from '../contests/Prizes';

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
    description: "Apologies Aren’t Enough, We Need Reparations Apologies Aren’t Enough, We Need Reparations",
    date: '3 day ago'
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
        <Box sx={{ p: 1 }}>
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

function ContestDetails() {
  const [data, setData] = useState();
  const [detail, setDetail] = useState();
  const param = useParams();
  const [showComment, setShowComment] = useState(false);
  const [comment, setComments] = React.useState([""]);

  useEffect(() => {

    const dd = storyData && storyData.filter((e) => e.name === param.id);
    setData(dd);
  }, [param, detail])


  const handleNavigate = (data) => {
    setDetail(data);
  }

  const handleShowComment = () => {
    setShowComment(!showComment);
  };

  const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


  return (
    <>
      <Header />
      <div className='footer-position' style={{ marginTop: '100px' }}>
        <div className='container'>
          <div className='row'>

            <div className='col-12'>
              <div className="mb-2">
                 {
                  data && data.map((e)=>(
                    <> 
                    <Typography gutterBottom   variant="h4"  >
                        {e.name}
                    </Typography> 
                    <Typography  gutterBottom   variant="body2" component="div" color="text.secondary">
                        {e.description}
                    </Typography>
                    </>
                  ))
                 }
              </div>
            </div>
            <div className='col-12'>
              <Box sx={{ width: '100%', p: 0 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Overview" {...a11yProps(0)} />
                    <Tab label="My Submission" {...a11yProps(1)} />
                    <Tab label=" Participants" {...a11yProps(2)} />
                    <Tab label="Rules" {...a11yProps(3)} />
                    <Tab label="Prizes" {...a11yProps(4)} />
                     
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0} className="p-0">
                  <Overview data={data}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                <MyProject data={data}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                   <Participants data={storyData}/>
                </TabPanel>
                <TabPanel value={value} index={3} className="p-0">
                  <Rules data={data}/>
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <Prizes data={data}/>
                </TabPanel>
              </Box>
            </div>
          </div>
        </div>
      </div>

    </ >
  )
}

export default ContestDetails