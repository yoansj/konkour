import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CheckIcon from '@material-ui/icons/Check';
import DescriptionIcon from '@material-ui/icons/Description';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { RawContestType } from '../../Firebase/dataTypes';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainCard: {
      background: "#FFFFFF",
      border: "1px solid #EBEBEB",
      boxSizing: "border-box",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.575)",
      borderRadius: "8px",
      width: 600,
      height: 400,
      marginBottom: 30,
      "& > *": {
        margin: 10
      }
    },
  }),
);

type SourceRendererProps = {
  /**
   * Source type of the contest found in its props
   */
  sourceType: string,

  /**
   * Url of the contest
   */
  url?: string,

  /**
   * Style applied to the image
   */
  style?: Object,
}

function SourceRenderer(props: SourceRendererProps) {

  const getIcon = () => {
    if (props.sourceType === "twitter") return ("https://upload.wikimedia.org/wikipedia/fr/c/c8/Twitter_Bird.svg")
    return ("https://upload.wikimedia.org/wikipedia/fr/c/c8/Twitter_Bird.svg")
  }

  return (
    <Button onClick={() => {if (props.url) window.open(props.url)}} style={{margin: 5}}>
      <img style={props.style} alt="logo of the source" src={getIcon()} />
    </Button>
  )
}

type FunctionnalProps = {
  /**
   * Function called on delete
   */
  deleteFunction: Function,
}

// https://stackoverflow.com/questions/55969554/react-prop-separation-based-on-multiple-typescript-interfaces
export default function RawContest(props: RawContestType & FunctionnalProps) {

  const classes = useStyles();

  const openTextModal = (text: string) => {
    Swal.fire({
      text,
      showCloseButton: true,
    })
  }

  return (
    <div className={classes.mainCard}>
      <Grid container direction="column" justify="space-evenly" alignItems="flex-start">
        <Grid
          container
          item
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          xs={12}
          >
            <div style={{display: "inline-block"}}>
              <SourceRenderer
                style={{ width: 50, height: 50 , display: "inline-block"}}
                sourceType={props.sourceType}
                url={props.url}
              />
              <h1 style={{ marginLeft: 5, display: "inline-block"}}>{props.author}</h1>
            </div>
            <Tooltip title={"Posté le " + props.contestDate.toDate().toLocaleDateString() + " et trouvé par le bot le " + props.harvestDate.toDate().toLocaleDateString()} arrow>
              <AccessTimeIcon fontSize="large" style={{marginTop: 24, marginLeft: 5}} />
            </Tooltip>
            <IconButton onClick={() => openTextModal(props.originalText)} style={{marginTop: 13, marginLeft: 5}}>
              <DescriptionIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={() => props.deleteFunction()} style={{marginTop: 13, marginLeft: 5}}>
              <DeleteIcon fontSize="large" style={{color: "red"}} />
            </IconButton>
          </Grid>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          item
          xs={3}
        >
          <h1 style={{ marginTop: 10, marginBottom: 10, marginLeft: 10 }}>
            Conditions
          </h1>
          <Tooltip
            title={`Le bot a trouvé ${props.twRt ? props.twRt[0] : 0}
            mots en rapport avec le fait de retweet le tweet sur
            ${props.twRt ? props.twRt[1] : 0} mots possibles`}
            placement="bottom"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <CheckIcon
                style={{ marginRight: 5 }}
                htmlColor={
                  props.twRt ? (props.twRt[0] > 0 ? "green" : "red") : "red"
                }
              />
              <p style={{ fontSize: 20, margin: 5 }}>RT</p>
            </div>
          </Tooltip>
          <Tooltip
            title={`Le bot a trouvé ${props.twFav ? props.twFav[0] : 0}
            mots en rapport avec le fait de like le tweet sur
            ${props.twFav ? props.twFav[1] : 0} mots possibles`}
            placement="bottom"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <CheckIcon
                style={{ marginRight: 5 }}
                htmlColor={
                  props.twFav ? (props.twFav[0] > 0 ? "green" : "red") : "red"
                }
              />
              <p style={{ fontSize: 20, margin: 5 }}>FAV</p>
            </div>
          </Tooltip>
          <Tooltip
            title={`Le bot a trouvé ${props.twComment ? props.twComment[0] : 0}
            mots en rapport avec le fait de commenter le tweet sur
            ${props.twComment ? props.twComment[1] : 0} mots possibles`}
            placement="bottom"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <CheckIcon
                style={{ marginRight: 5 }}
                htmlColor={
                  props.twComment ? (props.twComment[0] > 0 ? "green" : "red") : "red"
                }
              />
              <p style={{ fontSize: 20, margin: 5 }}>Commenter</p>
            </div>
          </Tooltip>
          <Tooltip
            title={`Le bot a trouvé ${props.twFollow ? props.twFollow[0] : 0}
            mots en rapport avec le fait de follow une ou plusieurs personnes sur
            ${props.twFollow ? props.twFollow[1] : 0} mots possibles`}
            placement="bottom"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <CheckIcon
                style={{ marginRight: 5 }}
                htmlColor={
                  props.twFollow ? (props.twFollow[0] > 0 ? "green" : "red") : "red"
                }
              />
              <p style={{ fontSize: 20, margin: 5 }}>Follow</p>
            </div>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
}