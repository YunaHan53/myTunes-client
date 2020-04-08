import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'

// Import song form
import SongForm from '../shared/SongForm'
// Import axios
import axios from 'axios'
// Import apiUrl
import apiUrl from '../../apiConfig'

const SongCreate = props => {
  const [song, setSong] = useState({
    title: '',
    artist: '',
    album: '',
    year: '',
    url: ''
  })
  const [createdSongId, setCreatedSongId] = useState(null)

  // On Submit
  const handleSubmit = event => {
    event.preventDefault()

    axios({
      method: 'POST',
      url: `${apiUrl}/songs/`,
      data: { song },
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then((res) => setCreatedSongId(res.data.song._id))
      .catch(error => {
        props.msgAlert({
          heading: 'Create Song Failed with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  // On handle change
  const handleChange = event => {
    const createField = {
      [event.target.name]: event.target.value
    }
    const createdSong = Object.assign({ ...song }, createField)
    setSong(createdSong)
  }

  // If song is created, redirect to /songs/:id
  if (createdSongId) {
    return <Redirect to={`/songs/${createdSongId}`} />
  }

  // Return the SongForm
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

export default SongCreate
