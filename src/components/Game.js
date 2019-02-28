import React, { Component } from 'react'
import axios from 'axios'
import Message from './Message'
import Cell from './Cell'
import Title from './Title'
import EmojiMessage from './EmojiMessage'
import Announcement from './Announcement'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      game: {
        id: 0,
        board: [[]],
        state: '',
        mines: 0
      },
      difficulty: 0
    }
  }
  componentDidMount() {
    let tempLastIdGame = localStorage.getItem('id-game')

    this.setState({ difficulty: this.props.difficulty })
    tempLastIdGame ? this.getLastGame(tempLastIdGame) : this.addNewGame()
  }

  addNewGame = () => {
    axios
      .post('https://minesweeper-api.herokuapp.com/games', {
        difficulty: this.props.difficulty
      })
      .then(resp => {
        localStorage.setItem('id-game', resp.data.id)
        this.setState({
          game: resp.data
        })
      })
  }
  getLastGame = tempLastIdGame => {
    axios
      .get(`https://minesweeper-api.herokuapp.com/games/${tempLastIdGame}`)
      .then(resp => {
        console.log({ resp })
        this.setState({
          game: resp.data
        })
      })
    console.log(this.state.game)
  }

  checkCell = (row, col) => {
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${
          this.state.game.id
        }/check`,
        {
          row: row,
          col: col
        }
      )
      .then(resp => {
        if (resp.data.state === 'won' || resp.data.state === 'lost') {
          localStorage.removeItem('id-game')
        }
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
        <div className="screen-message">
          <Message state={this.state.game.state} />
          <button onClick={this.addNewGame}>Restart</button>
        </div>
        <section className="game-board">
          <Title articleTitle="MINESWEEPER " />
          <div className="bombs-time-section">
            <Announcement notice={this.state.game.mines} />
            <EmojiMessage state={this.state.game.state} />
            <Announcement notice={this.state.game.id} />
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

export default Game
