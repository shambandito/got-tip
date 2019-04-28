import React from 'react';

import styles from './Statistics.module.css';
import { Typography, Paper } from '@material-ui/core';

const Statistics = ({ users, answers }) => {

  return (
    <div className={styles.container}>
      <Typography variant="h5" gutterBottom>Charakter Statistiken</Typography>
      <ul className={styles.characters}>
        {answers.characters.map((character, index) => {

          const deadTips = users.filter((user) => user.characters[index].dies === 'yes').length;
          const usersCount = users.length;

          const deadPercent = Math.floor((deadTips / usersCount) * 100);

          return (
            <Paper key={character.name} component={'li'} className={styles.character} elevation={1}>
              <img className={styles.characterImage} src={character.image} alt={character.name} />
              <div className={styles.characterContent}>
                <span className={styles.deadPercent}>{deadPercent}% </span>
                <Typography className={styles.characterName} variant="h6">
                  glauben, dass
                  <span className={styles.characterName}> {character.name} </span>
                  stirbt.
                </Typography>
              </div>
            </Paper>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(Statistics);