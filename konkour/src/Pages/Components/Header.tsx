import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LogoSvg from './LogoSvg';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    links: {
      position: 'relative',
      display: 'inline-block',
      width: '100%',
      marginLeft: 10,
    },
  }),
);

type HeaderProps = {
  /**
   * Depending on its value it changes the links displayed by the Header
   */
  isConnected: boolean
}

export default function Header(props: HeaderProps) {

  const classes = useStyles();

  if (props.isConnected)
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
            <div className={classes.links}>
              <Link style={{float: "right", color: "white", fontSize: "2rem", marginRight: 10}} to="/signup">Rond profil</Link>
              <Link style={{float: "right", color: "white", fontSize: "2rem", marginRight: 10}} to="/login">Concours</Link>
              <Link style={{float: "right", color: "white", fontSize: "2rem", marginRight: 50}} to="/login">Mes stats</Link>
            </div>
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