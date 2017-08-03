import axios from 'axios'

export function getRaywenderlichData(type, page = 1) {
  const url = '/' + type
  console.log(url)
  return axios.get(url, {
    params: {
      page: page
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}