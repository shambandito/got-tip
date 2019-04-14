import React, { useState } from 'react';

import styles from './SubmitContainer.module.css';
import { Input, Button, Typography, Paper } from '@material-ui/core';

const SubmitContainer = ({ onSubmit }) => {
  const [name, setName] = useState("");

  function handleSubmit() {
    onSubmit(name);
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
          disabled={!name}
          onClick={handleSubmit}
        >
          Einreichen
    </Button>
      </Paper>
    </div>
  );
};

export default React.memo(SubmitContainer);