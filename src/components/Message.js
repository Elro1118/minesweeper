import React, { Component } from 'react'

class Message extends Component {
  render() {
    return (
      <>
        {this.props.state === 'new' || this.props.state === 'playing' ? (
          <></>
        ) : this.props.state === 'won' ? (
          <h2 className="state-game">WON!</h2>
        ) : (
          <h2 className="state-game">LOST!</h2>
        )}
      </>
    )
  }
}

export default Message
