import React from 'react';

import Title from '../Components/Title';

/* Material */
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { KButton } from '../Components/KButton';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardRoot: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      background: "#FFFFFF",
      border: "1px solid #EBEBEB",
      boxSizing: "border-box",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
      borderRadius: "8px",
      width: 400,
      height: 180,
      margin: 50,
    },
    textField: {
      width: 250,
      margin: 10,
    },
  }),
);

export default function Home() {

  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Grid direction="column" alignItems="center" justify="center" container>
        <Grid
          alignItems="center"
          justify="center"
          direction="column"
          container
          item
          xs={6}
        >
          <Title />
          <h2 style={{ marginTop: -50, textAlign: "center" }}>
            C'est comme concours mais avec deux K
          </h2>
        </Grid>
        <Grid style={{marginTop: 45}} item xs={4}>
          <h2 style={{ textAlign: "center", textDecoration: "underline", fontWeight: "normal" }}>
            Comment ça marche ?
          </h2>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justify="space-evenly"
          direction="row"
        >
          <Grid>
            <h3 style={{ textAlign: "center", fontWeight: "normal" }}>
              1. Tu crée ton compte
            </h3>
            <Card className={classes.cardRoot}>
              <TextField
                variant="filled"
                label="Votre adresse mail magique"
                type="email"
                value="jadorelesconcours@gmail.com"
                className={classes.textField}
              />
              <TextField
                variant="filled"
                label="Votre adresse mail magique"
                type="password"
                value="jadorekonkour123456"
                className={classes.textField}
              />
            </Card>
          </Grid>
          <Grid>
            <h3 style={{ textAlign: "center", fontWeight: "normal" }}>
              2. Tu regarde les concours qui te plaisent
            </h3>
            <Card className={classes.cardRoot}>
              Un concours qui te plait ici
            </Card>
          </Grid>
          <Grid>
            <h3 style={{ textAlign: "center", fontWeight: "normal" }}>
              3. Tu participes
            </h3>
            <Card className={classes.cardRoot}>
              Les boutons pour participer ici
            </Card>
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="center" xs={6}>
          <h3 style={{ textAlign: "center" }}>
            Tu veux en savoir plus ? Hésite pas à t'inscrire ça prend deux secondes
          </h3>
          <Grid container direction="row" justify="center" alignItems="center">
            <KButton
              color="primary"
              variant="contained"
              style={{marginRight: 10}}
              onClick={() => history.push("/login")}
            >
              Se connecter
            </KButton>
            <KButton
              color="primary"
              variant="contained"
              onClick={() => history.push('/signup')}
            >
              S'inscrire
            </KButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}