import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Game from './components/Game'
import Options from './components/Options'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Options} />
          <Route exact path="/Game/:id" component={Game} />
        </Switch>
      </Router>
    )
  }
}

export default App
