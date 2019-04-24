import React, { Component } from 'react'
import Option from './Option'
import Title from './Title'
import { Link } from 'react-router-dom'
class Options extends Component {
  constructor(props) {
    super(props)
    this.state = {
      optionGame: [[0, 'Easy'], [1, 'Intermediate'], [2, 'Expert']]
    }
  }
  onRadioChange = event => {
    this.props.history.push(`/Game/${event.target.value}`)
  }
  render() {
    return (
      <>
        <div className="option-section">
          <Title articleTitle="Minesweeper Options" />
          <div>
            {this.state.optionGame.map(([value, text], i) => (
              <Link to={`/Game/${value}`}>
                <Option
                  key={i}
                  groupName="typeGame"
                  valueOption={value}
                  textOption={text}
                />
              </Link>
            ))}
          </div>
        </div>
      </>
    )
  }
}

export default Options
