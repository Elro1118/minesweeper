import React, { Component } from 'react'

class Title extends Component {
  render() {
    return (
      <>
        <h2 className="option-article">{this.props.articleTitle}</h2>
      </>
    )
  }
}

export default Title
