/*
https://medium.com/@agm1984/use-react-to-make-a-photo-follow-the-mouse-aka-transform-perspective-or-tilt-7c38f1b3a623
*/

import React, { Component } from 'react';
import GameBounds from "./GameBounds";

class App extends Component {
  render() {
    return (
      <GameBounds/>
    );
  }

  constructor(props) {
    super(props);
  }
}

export default App;
