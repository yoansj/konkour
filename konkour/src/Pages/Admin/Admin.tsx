import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { useUserProfile } from '../../Hooks/useUserProfile';

import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import NotPostedContests from './Components/NotPostedContests';

export default function Admin() {

  const [value, setValue] = useState(0);

  const history = useHistory();

  useUserProfile(null, (data: any) => {
    console.log(data, "<----")
    if (!data[0].isAdmin) {
      Swal.fire({
        title: "Vous n'êtes pas administrateur",
        text: "Désolé mais vous ne pouvez pas être ici :(",
        icon: "error",
      }).then(() => {
        history.push("/");
      })
    }
  })

  return (
    <div>
      <Paper>
        <Tabs
          value={value}
          onChange={(e, val) => {
            setValue(val);
            console.log(val);
          }}
          indicatorColor="primary"
          centered
        >
          <Tab label="Mon profil admin" />
          <Tab label="Concours non postés" />
          <Tab label="Concours postés" />
        </Tabs>
      </Paper>
      {value === 0 ? (
        <NotPostedContests />
      ) : value === 1 ? (
        <NotPostedContests />
      ) : value === 2 ? (
        <NotPostedContests />
      ) : (
        []
      )}
    </div>
  );
}