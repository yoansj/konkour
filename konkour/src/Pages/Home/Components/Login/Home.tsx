import React from 'react';

import Header from '../../../Components/Header';

import Grid from '@material-ui/core/Grid';
import Title from '../../../Components/Title';

export default function Home() {
  return (
    <div>
      <Header isConnected={false} />
      <Grid
        direction="column"
        alignItems="center"
        justify="center"
        container
      >
        <Grid item xs={6}>
          <Title />
        </Grid>
        <Grid item xs={6}>
          <h2>C'est comme concours mais avec deux K</h2>
        </Grid>
      </Grid>
    </div>
  )
}