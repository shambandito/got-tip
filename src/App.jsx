import React from 'react';

import './App.css';

import AppRouter from './routing/Router';
import { Typography } from '@material-ui/core';

class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <Typography component="h1" variant="h2" gutterBottom>GoT Tipp</Typography>
        <AppRouter />
      </div>
    );
  }
}

export default App;
