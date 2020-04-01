import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexSongs = (user) => {
  return axios({
    url: `${apiUrl}/songs`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const showSong = (user, id) => {
  return axios({
    url: `${apiUrl}/songs/${id}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const deleteSong = (user, id) => {
  return axios({
    url: `${apiUrl}/songs/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const createSong = (user, data) => {
  return axios({
    url: `${apiUrl}/songs`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { item: data }
  })
}

export const editSong = (user, data, id) => {
  return axios({
    url: `${apiUrl}/songs/${id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { song: data }
  })
}
