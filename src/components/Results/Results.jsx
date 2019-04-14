import React from 'react';
import classNames from 'classnames';

import firebase from '../../firebase';

import styles from './Results.module.css';

import Answers from '../../data/Answers.json';
import { Paper, Typography, Button, Tabs, Tab, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import classes from './Results.module.css';
import UserResults from './UserResults/UserResults';

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
              <UserResults
                name={selectedUser.name}
                characters={selectedUser.characters}
                answers={Answers}
              />
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

export default Results;