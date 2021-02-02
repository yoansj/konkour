import React from 'react';

/* Material UI */
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      marginTop: "1rem",
      padding: "0.8rem",
      backgroundColor: theme.palette.primary.main,
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      color: "white",
    },
  }),
);

export default function Footer(): any {

  const classes = useStyles();

  return (
    <div className={classes.footer}>
      Voici le Footer du site, il est pas très complet oui c'est vrai.
    </div>
  )
}