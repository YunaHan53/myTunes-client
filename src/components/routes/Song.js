import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import axios from 'axios'

import apiUrl from '../../apiConfig'

class Song extends Component {
  constructor (props) {
    super(props)

    this.state = {
      song: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/songs/${this.props.match.params.id}`)
      .then(res => this.setState({ song: res.data.song }))
      .catch(console.error)
  }

  delete = () => {
    axios({
      url: `${apiUrl}/songs/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }

  render () {
    const { song, deleted } = this.state

    if (deleted) {
      return <Redirect to='/songs' />
    }

    if (!song) {
      return (
        <img src="https://media.giphy.com/media/1416VN7GIFAAmI/giphy.gif" />
      )
    }
    // console.log(this.props.match.params.id)
    // console.log(song.url)

    return (
    // Display song info
      <div className='song-info'>
        <h3>{song.title}</h3>
        <p>Artist: {song.artist}</p>
        <p>Album: {song.album}</p>
        <p>Year Released: {song.year}</p>
        <p>Link: <Link to={{
          pathname: '/songs/song-player/',
          state: {
            fromSong: true,
            song: song.url
          }
        }}>
          {song.url}
        </Link>
        </p>
        <Link to={`/songs/${this.props.match.params.id}/edit`}>
          <Button variant="outline-success">Update Song</Button>
        </Link>
        <Button variant="outline-success" onClick={this.delete}>Delete Song</Button>
        <Link to="/songs">
          <Button variant="outline-success">Back to song list</Button>
        </Link>
      </div>
    )
  }
}

export default Song
