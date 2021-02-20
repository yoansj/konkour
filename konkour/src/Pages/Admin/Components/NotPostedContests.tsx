import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { db } from '../../../Firebase/firebase';
import RawContest from '../../Components/RawContest';
import { RawContestType } from '../../../Firebase/dataTypes';

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
      marginLeft: -295,
      overflowY: "scroll",
      "& > *": {
        marginTop: 30
      }
    }
  }),
);

export default function NotPostedContests() {

  const classes = useStyles();

  const [autoRefresh, setAutoRefresh] = useState(false);
  const [autoRefreshTiming, setAutoRefreshTiming] = useState<number | number[]>(30);
  const [refresh, setRefresh] = useState(false);
  //const [autoRefreshInterval, setAutoRefreshInterval] = useState<number | null>(null);
  const [contests, setContests] = useState<RawContestType[] | null>(null);

  const getContests = () => {
    db.collection("waiting-contests").limit(20).get().then((querySnapshot) => {
      let ct:any[] = [];
      querySnapshot.forEach((doc) => {
        ct.push({...doc.data(), id: doc.id})
      })
      setContests(ct);
    })
  }

  useEffect(() => {
    getContests();
  }, [refresh])

  const deleteElem = (index: number, id: string) => {
    if (contests) {
      let beg = contests.slice(0, index);
      let end = contests.slice(index + 1, contests.length - 1);
      setContests(beg.concat(end));
      console.log("Delete called !", index);
      db.collection("waiting-contests").doc(id).delete().then(
        (res) => console.log("Concours supprimé: ", res)
      )
    }
  }

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
          />
          <Button variant="outlined" color="primary" onClick={() => setAutoRefresh(!autoRefresh)}>
            {autoRefresh ? "Désactiver l'auto refresh" : "Activer l'auto refresh"}
          </Button>
          <Button variant="outlined" color="primary" onClick={() => setRefresh(!refresh)}>
            Rafraichir
          </Button>
        </Card>
        <Card className={classes.otherCard}>
          Un carte vide mais bientot avec du contenu on l'espère
        </Card>
      </Grid>
      <Grid item xs={8}>
        <div className={classes.contestsCard}>
          {contests ? contests.map((contest: RawContestType, index: number) =>
            <RawContest
              author={contest.author}
              contestDate={contest.contestDate}
              harvestDate={contest.harvestDate}
              url={contest.url}
              sourceType={contest.sourceType}
              key={contest.id}
              twRt={contest.twRt}
              twComment={contest.twComment}
              twFav={contest.twFav}
              twFollow={contest.twFollow}
              originalText={contest.originalText}
              deleteFunction={() => deleteElem(index, contest.id || "Nothing")}
            />
          ): []}
        </div>
      </Grid>
    </Grid>
  )
}