import React, { Component } from 'react'

class Title extends Component {
  render() {
    return (
      <>
        <header>{this.props.articleTitle}</header>
      </>
    )
  }
}

export default Title
