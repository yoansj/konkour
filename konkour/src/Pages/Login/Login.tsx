import React, { useState } from 'react';

/* Material UI */
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { auth } from '../../Firebase/firebase';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "10%",
    },
    textField: {
      width: 400,
      margin: 10,
    }
  }),
);

export default function Login(): any {

  const classes = useStyles();

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.currentTarget.value)
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.currentTarget.value)

  const attemptToRegister = (): void => {
    auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      window.localStorage.setItem(
        process.env.REACT_APP_AUTH ? process.env.REACT_APP_AUTH : "XXX",
        JSON.stringify(user.user)
      );
      history.push('/contests');
    })
    .catch((error) => {
      Swal.fire({
        title: 'Erreur !',
        text: error.message,
        icon: "error",
        timer: 5000
      })
    })
  }

  return (
    <div className={classes.root}>
      <Grid
        direction="column"
        alignItems="center"
        justify="center"
        container
      >
        <Grid item xs={6}>
          <h1
            style={{
              textAlign: "center",
              fontFamily: "Barlow",
              fontWeight: 300,
            }}
          >
            Pour se connecter a Konkour c'est juste ici !
            Besoin d'un tuto ?
          </h1>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="filled"
            label="Votre adresse mail magique"
            type="email"
            value={email}
            className={classes.textField}
            onChange={onChangeEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="filled"
            type="password"
            label="Votre mot de passe incassable"
            value={password}
            className={classes.textField}
            onChange={onChangePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            color="primary"
            variant="contained"
            onClick={attemptToRegister}
          >
            Se connecter
          </Button>
        </Grid>
        <Grid item xs={12}>
          <h4
            style={{
              textAlign: "center",
              fontFamily: "Barlow",
              fontWeight: 300,
            }}
          >
            Vous n'avez pas de compte ? Pas de soucis <a href="/login">créez vous un compte</a>
          </h4>
        </Grid>
      </Grid>
    </div>
  );
}