import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import Table from 'react-bootstrap/Table'

// Import Axios:
import axios from 'axios'
// Import apiConfig:
import apiUrl from '../../apiConfig'

const Songs = props => {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/songs`,
      method: 'GET'
    })
      .then(res => setSongs(res.data.songs))
      .catch()
  }, [])

  // Declaring songList variable
  let songList

  // If there are no songs
  if (!songs) {
    songList = 'You don\'t have any songs!'
  } else if (songs) {
    // Display the Songs
    songList = songs.map(song => (
      <tbody key={song._id}>
        <tr>
          <td><Link className="song-link" to={`/songs/${song._id}`}>{song.title}</Link></td>
          <td>{song.artist}</td>
          <td>{song.album}</td>
          <td>{song.year}</td>
        </tr>
      </tbody>
    ))
  } else {
    songList = <img src="https://media.giphy.com/media/1416VN7GIFAAmI/giphy.gif" />
  }

  // Return the list of songs as a table
  return (
    <div>
      <h2 className="title">Here are a list of all the songs</h2>
      <table responsive="sm" className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Year Released</th>
          </tr>
        </thead>
        {songList}
      </table>
    </div>
  )
}

export default Songs
