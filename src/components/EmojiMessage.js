import React, { Component } from 'react'

class EmojiMessage extends Component {
  render() {
    return (
      <>
        {this.props.state === 'new' || this.props.state === 'playing' ? (
          <div className="state-game">🙂</div>
        ) : this.props.state === 'won' ? (
          <div className="state-game">😎</div>
        ) : (
          <div className="state-game">😵</div>
        )}
      </>
    )
  }
}

export default EmojiMessage
