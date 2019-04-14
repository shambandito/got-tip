import React, { useState } from 'react';

import styles from './SubmitContainer.module.css';
import { Input, Button } from '@material-ui/core';

const SubmitContainer = ({ onSubmit }) => {
  const [ name, setName ] = useState("");

  function handleSubmit() {
    onSubmit(name);
  }

  return (
    <div className={styles.container}>
    <h2 className={styles.title}>Antworten einreichen</h2>
    <div className={styles.block}>
      <span className={styles.inputLabel}>Name</span>
      <Input
        className={styles.input}
        placeholder="Name eingeben"
        onChange={(event) => { setName(event.target.value) }}
      />
    </div>

    <Button
      className={styles.button}
      variant="contained"
      color={"primary"}
      disabled={!name}
      onClick={handleSubmit}
    >
      Einreichen
    </Button>
  </div>
  );
};

export default React.memo(SubmitContainer);