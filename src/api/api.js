import axios from 'axios'

export function getRaywenderlichData(page = 1) {
  const url = '/raywenderlich'
  return axios.get(url, {
    params: {
      page: page
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}