import React from 'react';

import styles from './CharacterContainer.module.css';
import { Paper, Typography, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox } from '@material-ui/core';

const CharacterContainer = ({ items, onRadioChange, onCheckboxChange }) => {

  return (
    <div className={styles.container}>
      <Typography variant="h4" gutterBottom>Charaktere</Typography>
      <ul className={styles.characters}>
        {items.map(character => {
          return (
            <Paper key={character.name} component={'li'} className={styles.character} elevation={1}>
              <Typography className={styles.inputLabel} variant="h6" gutterBottom>{character.name}</Typography>
              <FormGroup row>
                <RadioGroup
                  className={styles.radioGroup}
                  row={true}
                  name={`${character.name}-radios`}
                  value={character.dies}
                  onChange={(event) => { onRadioChange(character.name, event.target.value) }}
                >
                  <FormControlLabel value={'no'} control={<Radio />} label="Überlebt" />
                  <FormControlLabel value={'yes'} control={<Radio />} label="Stirbt" />
                </RadioGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={character.whiteWalker}
                      onChange={(event) => { onCheckboxChange(character.name, event.target.checked) }}
                      disabled={character.dies !== 'yes'}
                    />
                  }
                  label="Kehrt als White-Walker zurück"
                />
              </FormGroup>
            </Paper>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(CharacterContainer);