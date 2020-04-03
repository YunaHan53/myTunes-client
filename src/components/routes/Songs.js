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
    const { msgAlert } = this.props

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
      .catch(error => {
        msgAlert({
          heading: 'Get Songs Failed with error: ' + error.message,
          variant: 'danger'
        })
      })
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
          <Link className="song-link" to={`/songs/${song._id}`}>{song.title}</Link>
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
        <h1 className="title">Songs Page</h1>
        {songJSX}
      </div>
    )
  }
}

export default Songs
