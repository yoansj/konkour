import React, { useState } from 'react';

/* Material UI */
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { auth } from '../../Firebase/firebase';
import Swal from 'sweetalert2';

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

export default function Register(): any {

  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.currentTarget.value)
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.currentTarget.value)

  const attemptToRegister = (): void => {
    auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      window.localStorage.setItem(process.env.REACT_APP_AUTH ? process.env.REACT_APP_AUTH : "XXX", JSON.stringify(user.user));
      Swal.fire({
        title: 'Compte créé',
        text: "Vous pouvez désormais vous connecter à votre compte :)",
        icon: "success",
        footer: "<a href='/login'>Aller sur la page de connexion</a>"
      })
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
            Hop hop hop on remplit tout ça et on rejoint Konkour !
          </h1>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="filled"
            label="Une adresse mail valide"
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
            label="Un mot de passe solide comme un roc"
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
            S'inscrire
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
            Vous avez déja un compte ? <a href="/login">Connectez vous</a>
          </h4>
        </Grid>
      </Grid>
    </div>
  );
}