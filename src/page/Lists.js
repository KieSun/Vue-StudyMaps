import List from './ray.vue'

export default function createListView(type) {
  return {
    render(h) {
      return h(List, {
        props: {
          type
        }
      })
    }
  }
}
