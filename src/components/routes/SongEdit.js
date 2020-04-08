import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'

// Import song form
import SongForm from '../shared/SongForm'
// Import axios
import axios from 'axios'
// Import apiUrl
import apiUrl from '../../apiConfig'

const SongEdit = props => {
  const [song, editSong] = useState({
    title: '',
    artist: '',
    album: '',
    year: '',
    url: ''
  })
  const [edited, setEditedSong] = useState(false)

  // Updates the song
  useEffect(() => {
    axios(`${apiUrl}/songs/${props.match.params.id}`)
      .then(res => editSong(res.data.song))
      .catch(error =>
        props.msgAlert({
          heading: 'Update Failed with error: ' + error.message,
          variant: 'danger'
        }))
  }, [])

  // On handle submit
  const handleSubmit = event => {
    event.preventDefault()
    // If the song doesn't belong to owner
    if (props.user._id !== song.owner) {
      props.msgAlert({
        heading: 'You do not own this song',
        message: messages.notOwner,
        variant: 'danger'
      })
    }
    // API call for update
    axios({
      url: `${apiUrl}/songs/${props.match.params.id}`,
      method: 'PATCH',
      data: { song },
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(res => {
        setEditedSong(true)
      })
      .catch(error => {
        props.msgAlert({
          heading: 'Update Failed with error: ' + error.message,
          message: 'Cannot Update :(',
          variant: 'danger'
        })
      })
  }

  // On handle change
  const handleChange = event => {
    editSong({ ...song, [event.target.name]: event.target.value })
  }

  // If successfully edited, redirect to /songs/:id
  if (edited) {
    return <Redirect to={`/songs/${props.match.params.id}`} />
  }
  // console.log(song)

  // Return SongForm
  return (
    <div>
      <h3 className="title">Update Song Here</h3>
      <SongForm
        song={song}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/songs/${props.match.params.id}`}
      />
    </div>
  )
}

export default SongEdit
