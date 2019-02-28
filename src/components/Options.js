import React, { Component } from 'react'
import Game from './Game'
import Option from './Option'
import Title from './Title'
class Options extends Component {
  constructor(props) {
    super(props)
    this.state = {
      optionGame: [[0, 'Easy'], [1, 'Intermediate'], [0, 'Expert']],
      optionSelected: ''
    }
  }
  onRadioChange = event => {
    this.setState({
      optionSelected: event.target.value
    })
  }
  render() {
    return (
      <>
        {this.state.optionSelected === '' ? (
          <div className="option-section">
            <Title articleTitle="Minesweeper 's Options" />
            {this.state.optionGame.map(([value, text], i) => (
              <div key={i}>
                <Option
                  groupName="typeGame"
                  valueOption={value}
                  textOption={text}
                  onRadioChange={this.onRadioChange}
                />
              </div>
            ))}
          </div>
        ) : (
          <Game difficulty={this.state.optionSelected} />
        )}
      </>
    )
  }
}

export default Options
