import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ReactPlayer from 'react-player'

class SongPlayer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      song: {
        url: ''
      },
      playing: false
    }
  }

  render () {
    return (
      <div className="player">
        <ReactPlayer
          url={this.props.location.state.song} controls={true}
        />
      </div>
    )
  }
}

export default withRouter(SongPlayer)
