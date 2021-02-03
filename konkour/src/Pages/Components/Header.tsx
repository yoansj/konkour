import React, { useState, useEffect } from 'react';

/* Material UI */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LogoSvg, { UserSvg } from './LogoSvg';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles, withStyles, fade } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import SettingsIcon from '@material-ui/icons/Settings';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { Link, useHistory } from 'react-router-dom';


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #000000',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    links: {
      position: 'relative',
      display: 'inline-block',
      width: '100%',
      marginLeft: 10,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: '30%',
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '27ch',
      },
    },
  }),
);

export default function Header() {

  const classes = useStyles();
  const history = useHistory();

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [connected, setConnected] = useState<Boolean>(true);
  const [userString, setUserString] = useState<null | string>(null);

  const disconnect = () => {
    window.localStorage.removeItem(process.env.REACT_APP_AUTH ? process.env.REACT_APP_AUTH : "XXX");
    setAnchor(null);
    history.push("/");
    setConnected(!connected)
  }

  const profile = () => {
    setAnchor(null);
    history.push("/profile");
  }

  const onProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  }

  useEffect(() => {
    setUserString(window.localStorage.getItem(process.env.REACT_APP_AUTH ? process.env.REACT_APP_AUTH : "XXX"))
  }, [connected])

  if (userString !== null)
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start">
              <LogoSvg />
            </IconButton>
            <Typography variant="h4">
              Konkour
            </Typography>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Vous cherchez quelque chose ?"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            <div className={classes.links}>
              <Link style={{float: "right", color: "white", fontSize: "2rem", marginRight: 10}} to="/contests">Concours</Link>
              <Link style={{float: "right", color: "white", fontSize: "2rem", marginRight: 50}} to="/login">Mes stats</Link>
            </div>
            <IconButton onClick={onProfileClick} edge="end">
              <UserSvg />
            </IconButton>
            <StyledMenu
              id="profile-menu"
              anchorEl={anchor}
              keepMounted
              open={Boolean(anchor)}
              onClose={() => setAnchor(null)}
            >
              <StyledMenuItem>
                <ListItemIcon onClick={profile}>
                  <UserSvg htmlColor="black" fontSize="default" />
                </ListItemIcon>
                  Mon profil
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon>
                  <SettingsIcon htmlColor="black" />
                </ListItemIcon>
                  Paramètres
              </StyledMenuItem>
              <StyledMenuItem onClick={disconnect}>
                <ListItemIcon>
                  <MeetingRoomIcon htmlColor="black" />
                </ListItemIcon>
                  Se déconnecter
              </StyledMenuItem>
            </StyledMenu>
          </Toolbar>
        </AppBar>

      </div>
    )
  else
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" onClick={() => window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}>
              <LogoSvg />
            </IconButton>
            <Typography variant="h4">
              Konkour
            </Typography>
            <div className={classes.links}>
              <Link style={{float: "right", color: "white", fontSize: "2rem", marginRight: 10}} to="/signup">S'inscrire</Link>
              <Link style={{float: "right", color: "white", fontSize: "2rem", marginRight: 20}} to="/login">Connexion</Link>
              <Link style={{float: "right", color: "white", fontSize: "2rem", marginRight: 70}} to="/login">Stats</Link>
              <Link style={{float: "right", color: "white", fontSize: "2rem", marginRight: 20}} to="/">Accueil</Link>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
}