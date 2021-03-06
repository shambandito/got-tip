import React from 'react';

import styles from './Home.module.css';

import Data from '../../data/Data.json';
import firebase from '../../firebase';

import SubmitContainer from '../SubmitContainer/SubmitContainer';
import BonusContainer from '../BonusContainer/BonusContainer';
import CharacterContainer from '../CharacterContainer/CharacterContainer';
import { Button, Snackbar } from '@material-ui/core';

class Home extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      characters: [...Data.characters],
      bonus: [...Data.bonus],
      showToast: false
    };

    this.handleResultsClick = this.handleResultsClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleBonusChange = this.handleBonusChange.bind(this);

    this.handleToastClose = this.handleToastClose.bind(this);
  }

  handleResultsClick() {
    const { history } = this.props;

    history.push('/results');
  }

  handleRadioChange(name, dies) {
    const { characters } = this.state;

    const updatedCharacters = characters.map(character => {
      if (character.name === name) {
        return {
          ...character,
          dies: dies,
          whiteWalker: false
        }
      }

      return character;
    });

    this.setState({
      characters: updatedCharacters
    });
  }

  handleBonusChange(index, value) {
    const { bonus } = this.state;

    const updatedBonus = [...bonus];

    updatedBonus[index].answer = value;

    this.setState({
      bonus: updatedBonus
    });
  }

  handleCheckboxChange(name, checked) {
    const { characters } = this.state;

    const updatedCharacters = characters.map(character => {
      if (character.name === name) {
        return {
          ...character,
          whiteWalker: checked
        }
      }

      return character;
    });

    this.setState({
      characters: updatedCharacters
    });
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleSubmit(name) {
    const { characters, bonus } = this.state;

    console.log({
      name: name,
      characters: characters,
      bonus: bonus
    });

    const itemsRef = firebase.database().ref('users');

    const user = {
      name: name,
      characters: characters,
      bonus: bonus
    }

    itemsRef.push(user, (error) => {
      if(!error) {
        this.setState({
          showToast: true
        });
      }
    });
  }

  handleToastClose() {
    this.setState({
      showToast: false
    });
  }

  render() {
    const { characters, bonus, showToast } = this.state;

    return (
      <div className={styles.home}>
        <Button className={styles.resultsButton} onClick={this.handleResultsClick} variant="contained" size="large" color="primary">Ergebnisse</Button>

        <CharacterContainer
          items={characters}
          onRadioChange={this.handleRadioChange}
          onCheckboxChange={this.handleCheckboxChange}
        />

        <BonusContainer
          items={bonus}
          onChange={this.handleBonusChange}
        />

        <SubmitContainer
          onSubmit={this.handleSubmit}
        />

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={showToast}
          variant="success"
          autoHideDuration={5000}
          onClose={this.handleToastClose}
          message={<span className={styles.toastMessage}>Deine Ergebnisse wurden gespeichert.</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleToastClose}>
              OK
            </Button>
          ]}
        />
      </div>
    );
  }
}

export default Home;
