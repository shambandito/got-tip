import React from 'react';

import styles from './Ranking.module.css';
import { Typography, Paper } from '@material-ui/core';

const Ranking = ({ users, answers }) => {

  const userPoints = [];

  for (let user of users) {
    const pointsTotal = user.characters.reduce((result, character, index) => {
      const userSaysDead = character.dies === 'yes';
      //const userSaysWhiteWalker = character.whiteWalker;
      const realAnswer = answers.characters[index].dies;

      let answerCorrect = character.dies === realAnswer || (!userSaysDead && !realAnswer);

      return answerCorrect ? result + 1 : result - 1;
    }, 0);

    userPoints.push({
      ...user,
      points: pointsTotal
    });
  }

  userPoints.sort((a, b) => {
    return b.points - a.points;
  });

  return (
    <div className={styles.container}>
      <Typography variant="h5" gutterBottom>Aktueller Stand</Typography>
      <ul className={styles.users}>
        {userPoints.map((user, index) => {
          return (
            <Paper key={index} className={styles.user} component={'li'} elevation={1}>
              <Typography className={styles.position} variant="h6">{index + 1}.</Typography>
              <Typography className={styles.name} variant="h6">{user.name}</Typography>
              <Typography variant="button">
                <span className={styles.points}>{user.points} Punkt{user.points !== 1 && 'e'}</span>
              </Typography>
            </Paper>

          )
        })}
      </ul>
    </div>
  );
};

export default React.memo(Ranking);