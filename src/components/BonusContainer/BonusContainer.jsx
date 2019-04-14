import React, { useState } from 'react';

import styles from './BonusContainer.module.css';
import { Input, Button, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

const BonusContainer = ({ items, onChange }) => {

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bonusfragen</h2>
      {items.map((bonusItem, index) => {
        return (
          <div key={bonusItem.question} className={styles.block}>
            <span className={styles.inputLabel}>{bonusItem.question} ({bonusItem.points} Extrapunkt{bonusItem.points > 1 && 'e'})</span>
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
          </div>
        )
      })}
    </div>
  );
};

export default React.memo(BonusContainer);