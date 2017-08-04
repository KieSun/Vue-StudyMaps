import axios from 'axios'

export function getRaywenderlichData(type, page = 1) {
  const url = '/api/' + type
  return axios.get(url, {
    params: {
      page: page
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log('I have a error', error)
  })
}