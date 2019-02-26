import React, { Component } from 'react'

class Options extends Component {
  render() {
    return (
      <>
        <input
          type="radio"
          name={this.props.groupName}
          value={this.props.valueOption}
        />
        {this.props.textOption}
      </>
    )
  }
}

export default Options
