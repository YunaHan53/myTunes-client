// Import React and the Component
import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
// Import button styling from Bootstrap
import Button from 'react-bootstrap/Button'
import ReactPlayer from 'react-player'

// Import Axios:
import axios from 'axios'
// Import apiConfig:
import apiUrl from '../../apiConfig'

// Song component with constructor
const Song = props => {
  const [song, setSong] = useState(null)
  const [deleted, setDeleted] = useState(false)
  // const [playing, setPlaying] = useState({ url: '' })

  // Call this callback once after the first render, this only occurs once
  // because our dependency array is empty, so our dependencies never change
  // similar to componentDidMount
  useEffect(() => {
    // API call to the below url to get the song info
    axios(`${apiUrl}/songs/${props.match.params.id}`)
      // Make sure to update this.setState to our hooks setSong function
      .then(res => setSong(res.data.song))
      .catch()
  }, [])

  // console.log(props)

  // On deleting the song
  const destroy = () => {
    // If the song does not belong to owner
    if (props.user._id !== song.owner) {
      props.msgAlert({
        heading: 'You do not own this song',
        message: messages.notOwner,
        variant: 'danger'
      })
    }
    // If the song can delete, run this API call
    axios({
      url: `${apiUrl}/songs/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(error => props.msgAlert({
        heading: 'Delete Song Failed: ' + error.message,
        message: 'You cannot delete other peoples song sorry',
        variant: 'danger'
      }))
  }
  // When the song is successfully deleted, reroute to this page.
  if (deleted) {
    return <Redirect to={
      { pathname: '/songs',
        state: {
          message: 'Song deleted!'
        }
      }
    } />
  }

  // If no songs can be found
  if (!song) {
    return <p>Loading...</p>
  }

  // const playSong = () => {
  //   if (playing === false) {
  //     setPlaying(true)
  //   }
  // }
  //
  // const playBtn = (
  //   <Button variant="outline-success" onClick={playSong}>Play Song</Button>
  // )

  // Setting the buttons
  const editBtn = (
    <Link to={`/songs/${props.match.params.id}/edit`}>
      <Button variant="outline-success">Update Song</Button>
    </Link>
  )
  const deleteBtn = (<Button variant="outline-success" onClick={destroy}>Delete Song</Button>)

  // console.log(this.props.match.params.id)
  // console.log(song.url)

  return (
  // Otherwise, display song info and edit and delete buttons
    <div className='song-info'>
      <h3>{song.title}</h3>
      <p>Artist: {song.artist}</p>
      <p>Album: {song.album}</p>
      <p>Year Released: {song.year}</p>
      <p><a href={song.url} target="_blank" rel="noopener noreferrer">{song.url}</a></p>
      {(props.user._id === song.owner) ? <span>{editBtn}</span> : ''}
      {(props.user._id === song.owner) ? <span>{deleteBtn}</span> : ''}
      <Link to="/songs">
        <Button variant="outline-success">Back to song list</Button>
      </Link>
      <div className="player player-wrapper">
        <ReactPlayer
          className='react-player'
          url={song.url} controls={true}
          width='90%'
          height='90%'
        />
      </div>
    </div>
  )
}

export default Song
