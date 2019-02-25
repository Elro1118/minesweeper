import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  state = {
    myBoard: [[]],
    idGame: 0,
    phaseGame: ''
  }
  componentDidMount() {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', { difficulty: 0 })
      .then(resp => {
        console.log({ resp })

        this.setState({
          myBoard: resp.data.board,
          idGame: resp.data.id,
          phaseGame: resp.data.state
        })
      })
    console.log(this.state.idGame)
    console.log(this.state.phaseGame)
  }
  callGame() {
    // axios
    //   .get(`https://minesweeper-api.herokuapp.com/games/220039`)
    //   .then(resp => {
    //     console.log({ resp })
    //     this.setState({
    //       myBoard: resp.data.board
    //     })
    //   })
  }

  render() {
    return (
      <>
        <section className="game-board">
          <header>MINESWEEPER</header>
          <div className="bombs-time-section">
            <p className="label-section">BOM</p>
            <p className="label-section">00:59</p>
          </div>
          <table>
            <tbody>
              {this.state.myBoard.map((row, i) => {
                return (
                  <tr key={i}>
                    {row.map((col, j) => {
                      return (
                        <td key={j}>
                          <button className="button-section" value={col} />
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div>
            <button onClick={this.callGame}>New Game</button>
          </div>
        </section>
      </>
    )
  }
}

export default App
