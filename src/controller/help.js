export const omit = (obj, props) => {
  props.forEach(prop => {
    delete obj[prop]
  })
  return obj
}