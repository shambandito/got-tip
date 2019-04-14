import React from 'react';
import classNames from 'classnames';

import styles from './UserResults.module.css';

import { Paper, Typography } from '@material-ui/core';

const UserResults = ({ name, characters, bonus, answers }) => {

  let correctAnswers = 0;

  return (
    <div className={styles.results}>
      <Typography variant="h5" gutterBottom><span className={styles.userName}>{name}</span> hat getippt, dass</Typography>

      <ul className={styles.characters}>
        {characters.map((character, index) => {
          const userSaysDead = character.dies === 'yes';
          const userSaysWhiteWalker = character.whiteWalker;
          const realAnswer = answers.characters[index].dies;
          let answerCorrect = character.dies === realAnswer || (!userSaysDead && !realAnswer);

          const characterClasses = classNames({
            [styles.character]: true,
            [styles.alive]: !userSaysDead,
            [styles.dead]: userSaysDead
          });

          const statusClasses = classNames({
            [styles.characterStatus]: true,
            [styles.correct]: answerCorrect,
            [styles.wrong]: !answerCorrect
          });

          let characterText = 'überlebt';

          if (userSaysDead) {
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
                  {userSaysWhiteWalker && (
                    <>
                    <span> und als</span>
                    <span className={styles.userAnswer}> White Walker</span>
                    <span> zurückkehrt</span>
                    </>
                  )}
                </Typography>
                <Typography className={statusClasses} variant="overline">
                  {realAnswer ? 'Tot' : '(Bisher) am leben'}
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
{/* 
      <Typography variant="h5" gutterBottom>Bonus Fragen</Typography>

      <ul className={styles.bonusItems}>
        {bonus.map(bonusItem => {
          return (
            <Paper key={bonusItem.question} component={'li'} className={styles.bonusItem} elevation={1}>
              <div className={styles.left}>
                <Typography className={styles.characterName} variant="h6">
                  {bonusItem.question}
                </Typography>
              </div>
            </Paper>
          );
        })}
      </ul> */}

      <div className={styles.totalWrap}>
        <Typography className={styles.totalPoints} variant="h5">{correctAnswers} Punkte</Typography>
      </div>
    </div>
  )
};

export default React.memo(UserResults);