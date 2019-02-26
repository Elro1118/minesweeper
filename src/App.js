import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      game: {
        id: 0,
        board: [[]],
        state: '',
        mines: 0,
        difficulty: 0
      }
    }
  }
  componentDidMount() {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', {
        difficulty: this.state.difficulty
      })
      .then(resp => {
        console.log({ resp })

        this.setState({
          game: resp.data
        })
      })
  }
  checkCell = (row, col) => {
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${
          this.state.game.id
        }/check`,
        {
          id: this.state.game.id,
          row: row,
          col: col
        }
      )
      .then(resp => {
        console.log({ resp })
        this.setState({
          game: resp.data
        })
      })
  }

  flagCell = (event, row, col) => {
    event.preventDefault()
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${
          this.state.game.id
        }/flag`,
        {
          id: this.state.game.id,
          row: row,
          col: col
        }
      )
      .then(resp => {
        console.log({ resp })
        this.setState({
          game: resp.data
        })
      })
  }

  playCell = (event, row, col) => {
    // event.preventDefault()
    let typePlay = event.button === 0 ? 'check' : 'flag'
    console.log({ typePlay })
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${
          this.state.game.id
        }/${typePlay}`,
        {
          id: this.state.game.id,
          row: row,
          col: col
        }
      )
      .then(response => {
        this.setState({
          game: response.data
        })
      })
  }

  render() {
    return (
      <>
        {this.state.game.state === 'new' ||
        this.state.game.state === 'playing' ? (
          <></>
        ) : this.state.game.state === 'won' ? (
          <h2 className="state-game">WON!</h2>
        ) : (
          <h2 className="state-game">LOST!</h2>
        )}
        <section className="game-board">
          <header>MINESWEEPER</header>
          <div className="bombs-time-section">
            <p className="label-section">BOM</p>
            <p className="label-section">00:59</p>
          </div>
          <table>
            <tbody>
              {this.state.game.board.map((row, i) => {
                return (
                  <tr key={i}>
                    {row.map((col, j) => {
                      return (
                        <td
                          key={j}
                          className="button-section"
                          onClick={() => this.checkCell(i, j)}
                          onContextMenu={event => this.flagCell(event, i, j)}
                          // onMouseDown={event => this.playCell(event, i, j)}
                        >
                          {col !== '*' ? col : '💣'}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div />
        </section>
      </>
    )
  }
}

export default App
