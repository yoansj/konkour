import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { db } from '../../../Firebase/firebase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    autoRefreshCard: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      background: "#FFFFFF",
      border: "1px solid #EBEBEB",
      boxSizing: "border-box",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.575)",
      borderRadius: "8px",
      width: 280,
      height: 160,
      margin: 30,
    },
    otherCard: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      background: "#FFFFFF",
      border: "1px solid #EBEBEB",
      boxSizing: "border-box",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.575)",
      borderRadius: "8px",
      width: 280,
      height: 560,
      margin: 30,
    },
    contestsCard: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      background: "#FFFFFF",
      border: "1px solid #EBEBEB",
      boxSizing: "border-box",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.575)",
      borderRadius: "8px",
      width: "auto",
      height: 750,
      margin: 30,
      marginLeft: -295
    }
  }),
);

export default function NotPostedContests() {

  const classes = useStyles();

  const [autoRefresh, setAutoRefresh] = useState(false);
  const [autoRefreshTiming, setAutoRefreshTiming] = useState<number | number[]>(30);
  const [autoRefreshInterval, setAutoRefreshInterval] = useState<number | null>(null);
  const [contests, setContests] = useState<any[] | null>(null);

  const getContests = () => {
    db.collection("waiting-contests").get().then((querySnapshot) => {
      let ct:any[] = [];
      querySnapshot.forEach((doc) => {
        ct.push({...doc.data(), id: doc.id})
      })
      setContests(ct);
    })
  }

  useEffect(() => {
    getContests();
  }, [])

  return (
    <Grid direction="row" container>
      <Grid item xs={4}>
        <Card className={classes.autoRefreshCard}>
          <Slider
            value={autoRefreshTiming}
            valueLabelDisplay={autoRefresh ? "on" : "off"}
            step={5}
            marks
            min={5}
            max={60}
            onChange={(e, nb) => setAutoRefreshTiming(nb)}
            style={{width: 250, marginBottom: 20}}
            disabled={!autoRefresh}
          / >
          <Button variant="outlined" color="primary" onClick={() => setAutoRefresh(!autoRefresh)}>
            {autoRefresh ? "Désactiver l'auto refresh" : "Activer l'auto refresh"}
          </Button>
        </Card>
        <Card className={classes.otherCard}>
          Un carte vide mais bientot avec du contenu on l'espère
        </Card>
      </Grid>
      <Grid item xs={8}>
        <Card className={classes.contestsCard}>
          Les concours seront affichés ici
        </Card>
      </Grid>
    </Grid>
  )
}