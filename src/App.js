import React from 'react';

import './App.css';

import Data from './data/Data.json';
import { RadioGroup, Radio, Input, Button } from '@material-ui/core';
import SubmitContainer from './components/SubmitContainer/SubmitContainer';
import BonusContainer from './components/BonusContainer/BonusContainer';
import CharacterContainer from './components/CharacterContainer/CharacterContainer';

class App extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      characters: [...Data.characters],
      bonus: [...Data.bonus]
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleBonusChange = this.handleBonusChange.bind(this);
  }

  handleRadioChange(name, dies) {
    const { characters } = this.state;

    const updatedCharacters = characters.map(character => {
      if (character.name === name) {
        return {
          ...character,
          dies: dies,
          whiteWalker: dies === 'yes' ? false : character.whiteWalker
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
  }

  render() {
    const { characters, bonus } = this.state;

    return (
      <div className="App">
        <h1>GoT Tipp</h1>

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
      </div>
    );
  }
}

export default App;
