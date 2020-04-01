import React from 'react'
import { Link } from 'react-router-dom'

const SongForm = ({ song, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      placeholder="Song Title"
      value={song.title}
      name="title"
      onChange={handleChange}
      required
    />

    <label>Artist</label>
    <input
      placeholder="Artist"
      value={song.artist}
      name="artist"
      onChange={handleChange}
      required
    />

    <label>Album</label>
    <input
      placeholder="Album"
      value={song.album}
      name="album"
      onChange={handleChange}
    />

    <label>Year Released</label>
    <input
      type="integer"
      placeholder="YYYY"
      value={song.year}
      name="year"
      onChange={handleChange}
    />

    <label>Link URL</label>
    <input
      placeholder="https://example-song.com/song"
      value={song.url}
      name="url"
      onChange={handleChange}
      required
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default SongForm
