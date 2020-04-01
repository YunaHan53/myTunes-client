import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Import Axios:
import axios from 'axios'
// Import apiConfig:
import apiUrl from '../../apiConfig'

class Songs extends Component {
  constructor () {
    super()

    this.state = {
      songs: null
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/songs`,
      method: 'get'
    })
      .then(res => {
        this.setState({ songs: res.data.songs })
      })
      .catch(console.error)
  }

  render () {
    // Destructure things from state:
    const { songs } = this.state
    let songList

    if (!songs) {
      songList = 'You don\'t have any songs!'
    } else if (songs) {
      // Display the Songs
      songList = songs.map(song => (
        <li key={song._id}>
          <Link to={`/songs/${song.id}`}>{song.title}</Link>
        </li>
      ))
    } else {
      songList = <img src="https://media.giphy.com/media/1416VN7GIFAAmI/giphy.gif" />
    }

    return (
      <div>
        <h1>Songs Page</h1>
        {songList}
      </div>
    )
  }
}

export default Songs
