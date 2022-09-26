import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, Button, InputBase, ListItemAvatar, Paper, Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import UploadModal from '../components/modals/UploadModal';
import ProfileCreation from '../components/modals/CreateProfileModal';
import getProfiles from '../LensProtocol/profile/get-profiles';
import { useEthers } from "@usedapp/core";
import Web3Modal from 'web3modal';

import { LensAuthContext } from '../context/LensContext'
import Blockies from 'react-blockies'
import UpdateProfile from '../components/modals/update-profile';
import { search } from '../LensProtocol/reactions/search';
import SearchIcon from '@mui/icons-material/Search';  

const pages = [
    {
        name: 'Home',
        path: 'trending'
    },
    // {
    //     name: 'PFPs',
    //     path: 'pfps'
    // },
    // {
    //     name: 'Contests',
    //     path: 'contest'
    // },
    {
        name: 'Artists',
        path: 'memers'
    }
]

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    background: 'linear-gradient(to right top, #ff0f7b, #ff3d61, #ff6049, #ff7f36, #f89b29);',
    '&:hover': {
        background: 'linear-gradient(to left top, #ff0f7b, #ff3d61, #ff6049, #ff7f36, #f89b29);',
    },
}));



export default function Header() {

    const lensAuthContext = React.useContext(LensAuthContext);
    const { profile, login, disconnectWallet, update } = lensAuthContext;

    const { account, activateBrowserWallet, deactivate } = useEthers();
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);


    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [open, setOpen] = React.useState(false);
    const [editopen, setEditOpen] = React.useState(false);
    const [searchData, setSearchData] = React.useState([]);
    // const navigate = useRoutes();

    const theme = useTheme();
    const isConnected = account !== undefined;

    const drawerWidth = 240;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleNavigate =(id)=>{
        navigate(`/profile/${id}`)
    }





    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));


    const navigateToHome = () => {
        navigate('/');
    }

    const handleClickNavigate = (path) => {
        navigate(`/${path}`);
    }

    const handleSearch = async (e) => {
        const res = await search(e); 
        setSearchData(res.search.items)
    }



    return (
        <div className='container p-0 '>
            <Box sx={{ flexGrow: 1 }} >
                <AppBar sx={{ padding: { xs: '0', md: '0 85px', lg: '0 4%', background: 'black' } }} color='primary' open={open}>
                    <Toolbar>

                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ display: { xs: 'block', sm: 'none' }, mr: 2 }}
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />

                        </IconButton>


                        <Drawer
                            sx={{
                                width: open && drawerWidth,
                                flexShrink: 0,
                                '& .MuiDrawer-paper': {
                                    width: drawerWidth,
                                    boxSizing: 'border-box',
                                },
                            }}
                            variant="persistent"
                            anchor="left"
                            open={open}
                        >
                            <DrawerHeader>
                                <img alt='' style={{ cursor: 'pointer' }} onClick={navigateToHome} src='https://superfun.infura-ipfs.io/ipfs/QmZ52Ugz1Z3yuXVvMNiDfFacWUdDofAQBLifvfDagdVJem' />
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                </IconButton>
                            </DrawerHeader>
                            <Divider />
                            <List>
                                {pages.map((text, index) => (
                                    <ListItem key={text.name} disablePadding>
                                        <ListItemButton onClick={() => handleClickNavigate(text.path)}>
                                            <ListItemIcon>
                                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                            </ListItemIcon>
                                            <ListItemText primary={text.name} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Divider />
                            {
                                !profile && <Button className='m-2' style={{ background: '#488E72', color: 'white', textTransform: 'capitalize' }} onClick={login}>
                                    Login
                                </Button>
                            }

                        </Drawer>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' }, cursor: 'pointer' }}
                        >
                            <img alt='' onClick={navigateToHome} src='https://superfun.infura-ipfs.io/ipfs/QmZ52Ugz1Z3yuXVvMNiDfFacWUdDofAQBLifvfDagdVJem' />
                        </Typography>


                        <Paper
                            elevation={3}
                            component="form"
                            style={{ padding: '0', display: 'flex', alignItems: 'center',borderRadius: '24px',marginLeft:'20px' }}
                        >
                            <div className="input-group" style={{ background: 'white', borderRadius: '24px',padding:'2px 10px' }}>
                                <InputBase
                                    sx={{ ml: 1, flex: 1, color: 'black' }}
                                    placeholder="Search..."
                                    inputProps={{ 'aria-label': 'Search by Memers' }}
                                    onChange={(e) => handleSearch(e.target.value)}
                                /> 
                            </div>
                            <List   style={{position:'absolute',top:'60px', background:'black',maxHeight:'400px', overflowY:'scroll'}}>
                            {
                                searchData && searchData.map((e) => {
                                    return (
                                        <ListItem  button key={e.handle} onClick={() => handleNavigate(e.profileId)} >
                                            <ListItemAvatar>
                                                <Avatar src={e.picture == null ? 'assets/bg.png' : e.picture.original && e.picture.original.url}>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={e.handle} />
                                        </ListItem>
                                    )
                                })
                            }

                        </List>
                        </Paper>

                        



                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: 'auto' }}>
                            {pages.map((page) => (
                                <Link key={page.name} to={`/${page.path}`} underline="none" sx={{ my: 2, color: 'white', display: 'block', }}>{page.name}</Link>
                            ))}

                            {
                                !profile && <Button className='m-2' style={{ background: '#488E72', color: 'white', textTransform: 'capitalize' }} onClick={login}>
                                    Login
                                </Button>
                            }

                        </Box>
                        <UploadModal />
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <div onClick={handleOpenUserMenu} style={{ cursor: 'pointer' }} className="d-flex">
                                    <Avatar alt={profile.handle} src={profile.picture != null ? profile?.picture?.original?.url : "assets/bg.png"} />
                                    {
                                        profile && <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                                            <p className='text-center m-1'>{profile.name != null ? profile.name : profile.handle}</p>
                                        </Box>
                                    }
                                </div>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <UpdateProfile />
                                <ProfileCreation />
                                {
                                    profile && <MenuItem className='m-2' onClick={disconnectWallet}> Disconnect </MenuItem>
                                }

                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );

}