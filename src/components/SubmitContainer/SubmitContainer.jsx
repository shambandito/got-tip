import React, { useState } from 'react';

import styles from './SubmitContainer.module.css';
import { Input, Button, Typography, Paper } from '@material-ui/core';

const SubmitContainer = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [ buttonDisabled, setButtonDisabled ] = useState(false);

  function handleSubmit() {
    onSubmit(name);

    setButtonDisabled(true);

    window.setTimeout(() => {
      setButtonDisabled(false);
    }, 3000);
  }

  return (
    <div className={styles.container}>
      <Typography variant="h4" gutterBottom>Antworten einreichen</Typography>
      <Paper className={styles.block} elevation={1}>
        <Typography className={styles.inputLabel} variant="h6" gutterBottom>Dein Name</Typography>
        <Input
          className={styles.input}
          placeholder="Name eingeben"
          onChange={(event) => { setName(event.target.value) }}
        />
        <Button
          className={styles.button}
          variant="contained"
          color="secondary"
          disabled={buttonDisabled || !name}
          onClick={handleSubmit}
        >
          Einreichen
    </Button>
      </Paper>
    </div>
  );
};

export default React.memo(SubmitContainer);