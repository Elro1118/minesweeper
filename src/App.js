import React, { Component } from 'react'
import axios from 'axios'
import Message from './components/Message'
import Cell from './components/Cell'
import Title from './components/Title'
import EmojiMessage from './components/EmojiMessage'
import Announcement from './components/Announcement'

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
        this.setState({
          game: resp.data
        })
      })
  }

  render() {
    return (
      <>
        <Message state={this.state.game.state} />
        <section className="game-board">
          <Title articleTitle="MINESWEEPER" />
          <div className="bombs-time-section">
            <Announcement notice={this.state.game.mines} />
            <EmojiMessage state={this.state.game.state} />
            <Announcement notice="0:59" />
          </div>
          <table>
            <tbody>
              {this.state.game.board.map((row, i) => {
                return (
                  <tr key={i}>
                    {row.map((col, j) => {
                      return (
                        <Cell
                          key={j}
                          indexRow={i}
                          indexCell={j}
                          valueCell={col}
                          checkCell={() => this.checkCell(i, j)}
                          flagCell={this.flagCell}
                        />
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
