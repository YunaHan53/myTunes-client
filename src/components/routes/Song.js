import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

// Import Axios:
import axios from 'axios'
// Import apiConfig:
import apiUrl from '../../apiConfig'

class Song extends Component {
  constructor () {
    super()

    this.state = {
      song: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/songs/${this.props.match.params.id}`,
      method: 'get'
    })
      .then(res => this.setState({
        song: res.data.song }))
      .catch(console.error)
  }

  delete = (event) => {
    axios({
      url: `${apiUrl}/songs/${this.props.match.params.id}`,
      method: 'delete',
      headers: {
        Authorization: `Bearer ${this.props.useer.token}`
      }
    })
      .then(() => {
        this.setState({ deleted: true })
      })
      .catch(console.error)
  }

  render () {
    // Destructure from state:
    const { song, deleted } = this.state
    let playSong

    if (!song) {
      playSong = <img src="https://media.giphy.com/media/1416VN7GIFAAmI/giphy.gif" />
    } else if (deleted) {
      return <Redirect to={'/songs'} />
    } else {
      // Display song
      playSong = (
        <div>
          <h3>{song.title}</h3>
          <p>Artist: {song.artist}</p>
          <p>Album: {song.album}</p>
          <p>Year Released: {song.year}</p>
          <p>Link: {song.url}</p>
          <button onClick={this.delete}>Delete Song</button>
        </div>
      )
    }

    return (
      playSong
    )
  }
}

export default Song
