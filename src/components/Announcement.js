import React, { Component } from 'react'

class Announcement extends Component {
  render() {
    return (
      <>
        <p className="label-section">{this.props.notice}</p>
      </>
    )
  }
}

export default Announcement
