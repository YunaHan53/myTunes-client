import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

// Import song form
import SongForm from '../shared/SongForm'
// Import axios
import axios from 'axios'
// Import apiUrl
import apiUrl from '../../apiConfig'

class SongCreate extends Component {
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
      created: false,
      createId: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    axios({
      method: 'post',
      url: `${apiUrl}/songs/`,
      data: { song: this.state.song },
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then((res) => {
        this.setState({ created: true, createId: res.data.song._id })
      })
      .catch(console.error)
  }

  handleChange = (event) => {
    const createField = {
      [event.target.name]: event.target.value
    }
    const createdSong = Object.assign(this.state.song, createField)
    this.setState({ song: createdSong })
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { created, song } = this.state

    if (created) {
      return <Redirect to={'/songs/'} />
    }
    return (
      <div>
        <h3 className="title">Create Song Here</h3>
        <SongForm
          song={song}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath="/songs"
        />
      </div>
    )
  }
}

export default SongCreate
