import React from 'react';

import styles from './CharacterContainer.module.css';
import { RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox } from '@material-ui/core';

const CharacterContainer = ({ items, onRadioChange, onCheckboxChange }) => {

  return (
    <div className={styles.container}>
    <h2 className={styles.title}>Charaktere</h2>
    <ul className={styles.characters}>
      {items.map(character => {
        return (
          <li className={styles.character} key={character.name}>
            <span className={styles.inputLabel}>{character.name}</span>
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
          </li>
        );
      })}
    </ul>
  </div>
  );
};

export default React.memo(CharacterContainer);