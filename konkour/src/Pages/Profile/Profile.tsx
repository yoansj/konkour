import React from 'react';
import { useUserProfile } from '../../Hooks/useUserProfile';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    bannerDiv: {
      background: "rgb(91,0,255) linear-gradient(90deg, rgba(91,0,255,1) 0%, rgba(75,88,210,1) 100%)",
      display: "flex",
      color: "white",
    },
    avatarDiv: {
      marginLeft: 30,
      marginTop: 15,
      marginBottom: 15,
    },
    nameDiv: {
      marginLeft: 30,
    }
  }),
);

export default function Profile() {

  const classes = useStyles();
  const userProfile = useUserProfile(null, () => {});

  if (userProfile === null)
    return (
      <div style={{paddingTop: "5%"}}>
        <CircularProgress size="large" style={{position: 'absolute', top: "50%", left: "50%"}} />
      </div>
    )
  else
    return (
      <div>
        <Grid direction="column" container>
          <Grid direction="row" item xs={12}>
            <div className={classes.bannerDiv}>
              <div className={classes.avatarDiv}>
                <Avatar alt="Avatar" src="https://www.w3schools.com/howto/img_avatar.png" className={classes.large} />
              </div>
              <div className={classes.nameDiv}>
                <h1>{userProfile.name}</h1>
                <p>{userProfile.bio}</p>
              </div>
            </div>
          </Grid>
          <Grid direction="row" alignItems="center" justify="space-evenly" container item xs={12}>
            <Grid direction="column" item xs={4}>
              <h1>Commentaires</h1>
            </Grid>
            <Grid direction="column" item xs={4}>
              <h1>Participations</h1>
            </Grid>
            <Grid direction="column" item xs={4}>
              <h1>Médailles</h1>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
}

//test2@gmail.com
//123456