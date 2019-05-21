import React from 'react';
import classNames from 'classnames';

import styles from './UserResults.module.css';

import { Paper, Typography } from '@material-ui/core';

const UserResults = ({ name, characters, bonus, answers }) => {
  let correctAnswers = bonus.reduce((result, question) => {
    return question.correct ? result + question.points : result;
  }, 0);

  return (
    <div className={styles.results}>
      <Typography variant="h5" gutterBottom>Tipps von <span className={styles.userName}>{name}</span></Typography>

      <ul className={styles.characters}>
        {characters.map((character, index) => {
          const userSaysDead = character.dies === 'yes';
          const userSaysWhiteWalker = character.whiteWalker;
          const realAnswer = answers.characters[index].dies;
          let answerCorrect = character.dies === realAnswer;

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
              <img className={styles.characterImage} src={answers.characters[index].image} alt={character.name} />
              <div className={styles.characterContent}>
                <div className={styles.left}>
                  <Typography className={styles.characterName} variant="h6">
                    {character.name}
                    <span className={styles.userAnswer}> {characterText}</span>
                    {userSaysWhiteWalker && (
                      <>
                        <span> und wird</span>
                        <span className={styles.userAnswer}> White Walker</span>
                      </>
                    )}
                  </Typography>
                  <Typography className={statusClasses} variant="overline">
                    {realAnswer === 'yes' ? 'Tot' : 'Überlebt'}
                  </Typography>
                </div>

                <div className={styles.points}>
                  <Typography className={statusClasses} variant="button">
                    {points}
                  </Typography>
                </div>
              </div>
            </Paper>
          );
        })}
      </ul>

      <Typography variant="h5" gutterBottom>Bonus Fragen</Typography>

      <ul className={styles.bonusItems}>
        {bonus.map(bonusItem => {
          const statusClasses = classNames({
            [styles.characterStatus]: true,
            [styles.correct]: bonusItem.correct
          });

          return (
            <Paper key={bonusItem.question} component={'li'} className={styles.bonusItem} elevation={1}>
              <div className={styles.left}>
                <Typography className={styles.characterName} variant="h6">
                  {bonusItem.question} ({bonusItem.points} Extrapunkt{bonusItem.points > 1 && 'e'})
                </Typography>
                {bonusItem.radio ? (
                  <Typography variant="h6">
                    <span className={styles.userAnswer}>{bonusItem.answer === 'yes' ? 'Ja' : 'Nein'}</span>
                  </Typography>
                ) : (
                    <Typography className={styles.characterName} variant="h6">
                      <span className={styles.userAnswer}>{bonusItem.answer}</span>
                    </Typography>
                  )}
              </div>

              <div className={styles.points}>
                  <Typography className={statusClasses} variant="button">
                    {bonusItem.correct ? `+ ${bonusItem.points}` : '0'}
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