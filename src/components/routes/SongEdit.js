import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

// Import song form
import SongForm from '../shared/SongForm'
// Import axios
import axios from 'axios'
// Import apiUrl
import apiUrl from '../../apiConfig'

class SongEdit extends Component {
  constructor () {
    super()

    this.state = {
      song: {
        title: '',
        artist: '',
        album: '',
        year: '',
        url: ''
      },
      updated: false
    }
  }

  // Finds the song
  componentDidMount () {
    axios({
      url: `${apiUrl}/songs/${this.props.match.params.id}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ song: res.data.song }))
      .catch(console.error)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.props)
    axios({
      method: 'patch',
      url: `${apiUrl}/songs/${this.props.match.params.id}`,
      data: { song: this.state.song },
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then((res) => {
        this.setState({ updated: true })
      })
      .catch(console.error)
  }

  handleChange = (event) => {
    const updateField = {
      [event.target.name]: event.target.value
    }
    const updatedSong = Object.assign(this.state.song, updateField)
    this.setState({ song: updatedSong })
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { song, updated } = this.state

    if (updated) {
      return <Redirect to={`/songs/${this.props.match.params.id}`} />
    }

    console.log(song)
    return (
      <div>
        <h3>Update Song Here</h3>
        <SongForm
          song={song}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/songs/${this.props.match.params.id}`}
        />
      </div>
    )
  }
}

export default SongEdit
