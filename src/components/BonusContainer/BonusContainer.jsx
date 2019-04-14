import React from 'react';

import styles from './BonusContainer.module.css';
import { Input, RadioGroup, FormControlLabel, Radio, Typography, Paper } from '@material-ui/core';

const BonusContainer = ({ items, onChange }) => {

  return (
    <div className={styles.container}>
      <Typography variant="h4" gutterBottom>Bonus Fragen</Typography>
      {items.map((bonusItem, index) => {
        return (
          <Paper key={bonusItem.question} className={styles.block} elevation={1}>
            <Typography className={styles.inputLabel} variant="h6" gutterBottom>
              {bonusItem.question} ({bonusItem.points} Extrapunkt{bonusItem.points > 1 && 'e'})
            </Typography>
            {bonusItem.radio ? (
              <RadioGroup
                className={styles.radioGroup}
                row={true}
                name={`${bonusItem.question}-radios`}
                value={bonusItem.answer}
                onChange={(event) => { onChange(index, event.target.value) }}
              >
                <FormControlLabel value={'yes'} control={<Radio />} label="Ja" />
                <FormControlLabel value={'no'} control={<Radio />} label="Nein" />
              </RadioGroup>
            ) : (
                <Input
                  className={styles.input}
                  name={`${bonusItem.question}-input`}
                  placeholder="Antwort eingeben"
                  value={bonusItem.answer}
                  onChange={(event) => { onChange(index, event.target.value) }}
                />
              )}
          </Paper>
        );
      })}
    </div>
  );
};

export default React.memo(BonusContainer);