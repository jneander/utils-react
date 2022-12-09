export function When(props) {
  if (props.case) {
    return props.children
  }

  return null
}
