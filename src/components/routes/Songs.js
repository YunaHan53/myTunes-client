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
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ songs: res.data.songs })
      })
      .catch(console.error)
  }

  render () {
    // Destructure things from state:
    const { songs } = this.state
    let songJSX

    if (!songs) {
      songJSX = 'You don\'t have any songs!'
    } else if (songs) {
      // Display the Songs
      const songList = songs.map(song => (
        <li key={song._id}>
          <Link to={`/songs/${song._id}`}>{song.title}</Link>
        </li>
      ))

      songJSX = (
        <div>
          {songList}
        </div>
      )
    } else {
      songJSX = <img src="https://media.giphy.com/media/1416VN7GIFAAmI/giphy.gif" />
    }

    return (
      <div>
        <h1>Songs Page</h1>
        {songJSX}
      </div>
    )
  }
}

export default Songs
