 

import { Avatar , List, ListItem, ListItemAvatar, ListItemText  } from '@mui/material'
import React  from 'react'
import Header from '../../header/Header'
import Search from '../Search'    
import ReactPlayer from 'react-player';
import ImageIcon from '@mui/icons-material/Image';

function ClipList() {  
     
    const clipData = [
      {
          name: "'alpha' is defined but never used  ",
          img: "https://www.youtube.com/watch?v=uelA2U9TbgM",
          user:'@jaydippatel83'
      },
      {
          name: "'alpha' is defined but never used  ",
          img: "https://www.youtube.com/watch?v=t_cSk9tQQkk",
          user:'@mansijoshi'
      },
      {
          name: "InputBase' is defined but never used ",
          img: "https://www.youtube.com/watch?v=t_cSk9tQQkk",
          user:'@karanpujara'
      },
      {
          name: "InputBase' is defined but never used ",
          img: "https://www.youtube.com/watch?v=t_cSk9tQQkk",
          user:'@disha'
      },
      {
          name: "Cli'SearchIcon' is defined but never usedp1",
          img: "https://www.youtube.com/watch?v=t_cSk9tQQkk",
          user:'@jaydippatel30'
      }, 
  ]
 
 

    return (
        <>
            <Header />
            <div className='footer-position' style={{ marginTop: '100px' }}>
                <Search />
                <div className='container'>
                    <div className='row mt-5'>
                         {
                          clipData && clipData.map((e)=>{
                            return (
                              <div key={e.user} className="col-lg-4 col-md-4 col-sm-6 col-12">
                                            <ReactPlayer url={e.img} style={{ padding: '5px', borderRadius: '20px' }} width="100%"  />
                                            <List>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <ImageIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={e.name} secondary={e.user}/>
                                            </ListItem> 
                                        </List>
                               </div>
                            )
                          })
                         }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClipList