import React from 'react';

import styles from './Ranking.module.css';
import { Typography, Paper } from '@material-ui/core';

const Ranking = ({ users, answers }) => {

  const userPoints = [];

  for (let user of users) {
    let pointsTotal = user.characters.reduce((result, character, index) => {
      const userSaysDead = character.dies === 'yes';
      //const userSaysWhiteWalker = character.whiteWalker;
      const realAnswer = answers.characters[index].dies;

      let answerCorrect = character.dies === realAnswer || (!userSaysDead && !realAnswer);

      return answerCorrect ? result + 1 : result - 1;
    }, 0);

    pointsTotal = pointsTotal + user.bonus.reduce((result, question) => {
      return question.correct ? result + question.points : result;
    }, 0);

    userPoints.push({
      ...user,
      points: pointsTotal
    });
  }

  userPoints.sort((a, b) => {
    return b.points - a.points;
  });

  let position = 0;
  let samePointsCount = 1;

  return (
    <div className={styles.container}>
      <Typography variant="h5" gutterBottom>Finaler Stand</Typography>
      <ul className={styles.users}>
        {userPoints.map((user, index) => {

          if (index > 0 && userPoints[index - 1].points === user.points) {
            samePointsCount++;
          }

          if (index === 0 || (index > 0 && userPoints[index - 1].points > user.points)) {
            if (samePointsCount > 1) {
              position = position + samePointsCount;
              samePointsCount = 1;
            } else {
              position++;
            }
          }

          return (
            <Paper key={index} className={styles.user} component={'li'} elevation={1}>
              <Typography className={styles.position} variant="h6">{(index === 0 || index > 0 && userPoints[index - 1].points !== user.points) && `${position}.`}</Typography>
              {index === 0 && (
                <img src={'https://i.pinimg.com/originals/34/df/e6/34dfe675aeb3fa6f30b83c7cf35cd7d9.png'} alt={'Sieger'} />
              )}
              <Typography className={styles.name} variant="h6">
                {user.name}
              </Typography>

              <div className={styles.winner}>
                {index === 0 && (
                  <>
                    <img src={'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/146/party-popper_1f389.png'} alt={''} />
                    <img src={'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/146/party-popper_1f389.png'} alt={''} />
                    <img src={'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/146/party-popper_1f389.png'} alt={''} />
                  </>
                )}
              </div>
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