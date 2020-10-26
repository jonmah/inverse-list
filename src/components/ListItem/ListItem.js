import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.25rem;
  padding: 0.5rem;
  position: relative;
`

const ListItem = ({
  body,
  draggableProps,
  dragHandleProps,
  handleDelete,
  id,
  ref,
}) => {
  console.log(ref)
  console.log(dragHandleProps)
  return (
    <Container ref={ref} {...draggableProps} {...dragHandleProps}>
      <button onClick={() => handleDelete(id)}>delete</button>
      {body}
    </Container>
  )
}

export default ListItem
