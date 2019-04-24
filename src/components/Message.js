import React, { Component } from 'react'

class Message extends Component {
  render() {
    return (
      <>
        {this.props.state === 'new' || this.props.state === 'playing' ? (
          <></>
        ) : (
          <h2 className="state-game">
            {' '}
            {this.props.state ? this.props.state : <></>}
          </h2>
        )}
      </>
    )
  }
}

export default Message
