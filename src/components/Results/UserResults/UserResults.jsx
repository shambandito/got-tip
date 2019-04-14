import React from 'react';
import classNames from 'classnames';

import styles from './UserResults.module.css';

import { Paper, Typography } from '@material-ui/core';

const UserResults = ({ name, characters, answers }) => {

  let correctAnswers = 0;

  return (
    <div className={styles.results}>
      <Typography variant="h5" gutterBottom><span className={styles.userName}>{name}</span> hat getippt, dass</Typography>

      <ul className={styles.characters}>
        {characters.map((character, index) => {
          const characterDead = character.dies === 'yes';
          const realAnswer = answers.characters[index].dies;
          let answerCorrect = character.dies === realAnswer || !realAnswer;

          const characterClasses = classNames({
            [styles.character]: true,
            [styles.alive]: !characterDead,
            [styles.dead]: characterDead
          });

          const statusClasses = classNames({
            [styles.characterStatus]: true,
            [styles.correct]: answerCorrect,
            [styles.wrong]: !answerCorrect
          });

          let characterText = 'überlebt';

          if (characterDead) {
            characterText = 'stirbt';
          }

          let points = '0'

          if (answerCorrect) {
            points = '+ 1';
            correctAnswers += 1;
          } else {
            points = '- 1'
            correctAnswers -= 1;
          }

          return (
            <Paper key={character.name} component={'li'} className={characterClasses} elevation={1}>
              <div className={styles.left}>
                <Typography className={styles.characterName} variant="h6">
                  {character.name}
                  <span className={styles.userAnswer}> {characterText}</span>
                </Typography>
                <Typography className={statusClasses} variant="overline">
                  {character.name} {characterDead ? 'ist tot' : 'lebt'}
                </Typography>
              </div>

              <div className={styles.points}>
                <Typography className={statusClasses} variant="button">
                  {points}
                </Typography>
              </div>
            </Paper>
          );
        })}
      </ul>
      <div className={styles.totalWrap}>
        <Typography className={styles.totalPoints} variant="h5">{correctAnswers} Punkte</Typography>
      </div>
    </div>
  )
};

export default React.memo(UserResults);