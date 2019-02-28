import React, { Component } from 'react'
import Game from './components/Game'
import Options from './components/Options'

class App extends Component {
  state = {
    oldIdGame: localStorage.getItem('id-game')
  }
  render() {
    return <>{this.state.oldIdGame ? <Game /> : <Options />}</>
  }
}

export default App
