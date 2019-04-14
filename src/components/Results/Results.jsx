import React from 'react';
import classNames from 'classnames';

import firebase from '../../firebase';

import styles from './Results.module.css';

import Answers from '../../data/Answers.json';
import { Paper, Typography, Button, Tabs, Tab, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import classes from './Results.module.css';

class Results extends React.PureComponent {

  state = {
    selectedTab: 0,
    selectedUserId: null,
    users: []
  }

  componentDidMount() {
    const users = firebase.database().ref('users');

    users.on('value', (snapshot) => {
      let items = snapshot.val();
      let newUsers = [];

      for (let itemKey in items) {
        newUsers.push({
          id: itemKey,
          ...items[itemKey]
        });
      }

      this.setState({
        users: newUsers,
        selectedUserId: newUsers[0].id
      });
    });
  }

  handleTabSwitch = (event, value) => {
    this.setState({
      selectedTab: value
    });
  }

  handleUserChange = (event) => {
    this.setState({
      selectedUserId: event.target.value
    });
  }

  render() {
    const { history } = this.props;
    const { selectedTab, users, selectedUserId } = this.state;

    const selectedUser = users.find(user => user.id === selectedUserId);

    return (
      <div className={styles.container}>
        <Button className={styles.backButton} onClick={() => { history.push("/"); }} variant="contained" size="large" color="primary">Zurück</Button>

        <Tabs className={styles.tabs} value={selectedTab} onChange={this.handleTabSwitch} variant="fullWidth">
          <Tab label="Tipp Ergebnisse" />
          <Tab label="Rangliste" />
        </Tabs>

        {selectedTab === 0 && (
          <div className={styles.resultsContainer}>
            <FormControl className={styles.selectWrap}>
              <InputLabel htmlFor="tipper">Tipper</InputLabel>
              <Select
                variant="filled"
                value={selectedUserId || ""}
                onChange={this.handleUserChange}
              >
                <MenuItem value="" disabled>
                  Tipper auswählen
                </MenuItem>
                {users.map(user => {
                  return (
                    <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {!!selectedUser && (
              <div className={styles.results}>
                <Typography variant="h5" gutterBottom>{selectedUser.name} hat getippt, dass</Typography>

                <ul className={styles.characters}>
                  {selectedUser.characters.map((character, index) => {
                    const characterDead = character.dies === 'yes';
                    const realAnswer = Answers.characters[index].dies;
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
                    } else {
                      points = '- 1'
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

                        <div className={classes.points}>
                          <Typography className={statusClasses} variant="button">
                            {points}
                          </Typography>
                        </div>
                      </Paper>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}

        {selectedTab === 1 && (
          <div className={styles.rankings}>
            RANKINGS
          </div>
        )}
      </div>
    );
  }


};

export default React.memo(Results);