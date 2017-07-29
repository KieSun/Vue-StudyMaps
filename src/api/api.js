import axios from 'axios'

export function getRaywenderlichData(page = 1) {
  const url = '/raywenderlich'
  let params = {
    page: page
  }
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}