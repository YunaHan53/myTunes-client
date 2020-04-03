import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

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
      <div className="player player-wrapper">
        <Link to={`/songs/${this.props.match.params.id}/edit`}>
          <Button variant="outline-success">Update Song</Button>
        </Link>
        <Button variant="outline-success" onClick={this.delete}>Delete Song</Button>
        <Link to="/songs">
          <Button variant="outline-success">Back to song list</Button>
        </Link>
        <ReactPlayer
          className='react-player'
          url={this.props.location.state.song} controls={true}
          width='100%'
          height='100%'
        />
      </div>
    )
  }
}

export default withRouter(SongPlayer)
