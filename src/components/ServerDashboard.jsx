import {
    Box,
    Drawer,
    AppBar,
    CssBaseline,
    Toolbar,
    Divider,
    List,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText,
    Hidden,
    BottomNavigation,
    BottomNavigationAction,
    IconButton,
    Modal,
    Button
  } from '@material-ui/core'
  import {
      Storage as StorageIcon,
      AccountCircle as AccountIcon,
      SupervisorAccount as AdminIcon,
      Menu as MenuIcon,
      Logout as LogoutIcon,
      Business as InstanceIcon,

  } from '@material-ui/icons'
  import InboxIcon from '@material-ui/icons/Inbox'
  import MailIcon from '@material-ui/icons/Mail'
  import jsonwebtoken from 'jsonwebtoken'
  import React from 'react'
  import Cookies from 'js-cookie'
  import axios from 'axios'
  import {
    Link,
    useParams
  } from 'react-router-dom'
  const drawerWidth = 240;
  function Dashboard(props) {
    console.log(props)
      const [isMobile, setIsMobile] = React.useState(false)
   
  //choose the screen size 
  const handleResize = () => {
    if (window.innerWidth < 900) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
  }
  
  // create an event listener
  React.useEffect(()=> {
      handleResize()
  })
  React.useEffect(() => {
    window.addEventListener("resize", handleResize)
  })
    const [user_data, setUserData] = React.useState({
      email: null,
      first_name: null,
      last_name: null,
      admin: null
    })
    const [value, setValue] = React.useState(0);
    const [navOpen, setNavOpen] = React.useState(true);
    const toggleDrawer = () => {
        console.log('nice')
        console.log(navOpen)
        if (navOpen == true) {
            setNavOpen(false)
        } else {
            setNavOpen(true)
        }
      setNavOpen(true);
    };
    React.useEffect(() => {
      if (Cookies.get('token')) {
        var user_info = jsonwebtoken.decode(Cookies.get('token'))
          setUserData({
            first_name: user_info.first_name,
            last_name: user_info.last_name,
            email: user_info.email,
            admin: user_info.admin
          })
  
      }
    }, [])
  const styles = {
      stickToBottom: {
          width: '100%',
          position: 'fixed',
          bottom: 0,
        },
  }
    return (
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
  
            <Typography sx={{ flexGrow: 1 }} variant="h6" noWrap component="div">
              Ararat
            </Typography>
            <IconButton component={Link} to="/auth/logout" edge="end">                   <LogoutIcon /></IconButton>
  
          </Toolbar>
        </AppBar>
        <Hidden only={["sm", "xs"]}>
        <Drawer
          open={navOpen}
          anchor="left"
          variant={isMobile == true ? "persistent" : "permanent"}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box"
            }
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <Divider />
            <List>
            <ListItem selected={props.page == "servers" ? true : false} button component={Link} to="/" key='Servers'>
                  <ListItemIcon>
                     <StorageIcon />
                  </ListItemIcon>
                  <ListItemText primary='Servers' />
                </ListItem>
            <ListItem selected={props.page == "account"  ? true : false} button component={Link} to="/account" key='Account'>
                  <ListItemIcon>
                     <AccountIcon />
                  </ListItemIcon>
                  <ListItemText primary='Account' />
                </ListItem>
                </List>
                {user_data.admin == true ?          <>                     <Divider />                <List>

  <ListItem button component={Link} to="/admin" key='Admin'>
                  <ListItemIcon>
                     <InstanceIcon />
                  </ListItemIcon>
                  <ListItemText
                   primary='Admin' />
                </ListItem>                </List>
 </>: ""}

          </Box>
        </Drawer>
        </Hidden>  
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {props.children}
          
        <Hidden only={["lg", "xl", "md"]}>
        <Box style={     {   width: '100%',
          position: 'fixed',
          bottom: 0}}sx={{ width: 500}}>
        <BottomNavigation
          showLabels
          value={currentPage}
          onChange={(event, newValue) => {
            setCurrentPage(newValue);
          }}
        >
          <BottomNavigationAction value={'servers'} selected={props.page == "server" ? true : false} component={Link} to='/' label="Servers" icon={<StorageIcon />} />
          <BottomNavigationAction value={'account'} selected={props.page == "account" ? true : false } component={Link} to="/account" label="Account" icon={<AccountIcon />} />
          <BottomNavigationAction component={Link} to="/admin" label="Admin" icon={<AdminIcon />} />
        </BottomNavigation>
      </Box>
        </Hidden>
      </Box>
      </Box>
    )
  }
  
  export default Dashboard