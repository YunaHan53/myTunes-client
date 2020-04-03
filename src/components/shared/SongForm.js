import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const SongForm = ({ song, handleSubmit, handleChange, cancelPath }) => (
  <form className='inline-form' onSubmit={handleSubmit}>
    <label className='mt-2 mr-2'>Title</label>
    <input
      className='form-control mt-2 mr-2'
      placeholder="Song Title"
      value={song.title}
      name="title"
      onChange={handleChange}
      required
    />

    <label className='mt-2 mr-2'>Artist</label>
    <input
      className='form-control mt-2 mr-2'
      placeholder="Artist"
      value={song.artist}
      name="artist"
      onChange={handleChange}
      required
    />

    <label className='mt-2 mr-2'>Album</label>
    <input
      className='form-control mt-2 mr-2'
      placeholder="Album"
      value={song.album}
      name="album"
      onChange={handleChange}
    />

    <label className='mt-2 mr-2'>Year Released</label>
    <input
      className='form-control mt-2 mr-2'
      type="number"
      placeholder="YYYY"
      value={song.year}
      name="year"
      onChange={handleChange}
    />

    <label className='mt-2 mr-2'>Link URL</label>
    <input
      type='url'
      className='form-control mt-2 mr-2'
      placeholder="https://example.com/song"
      value={song.url}
      name="url"
      onChange={handleChange}
      required
    />

    <Button variant="outline-success" className='mt-2 mr-2' type="submit">Submit</Button>
    <Link to={cancelPath}>
      <Button variant="outline-danger" className='mt-2 mr-2'>Cancel</Button>
    </Link>
  </form>
)

export default SongForm
