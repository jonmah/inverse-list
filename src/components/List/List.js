import React, { useRef, useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const RENDER_LIMIT = 10

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scroll-behavior: smooth;
  width: 100%;
`
const Item = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.25rem;
  padding: 0.5rem;
  position: relative;
`
const List = ({ handleDeleteItem, list, onDragEnd }) => {
  const ref = useRef()
  const [count, setCount] = useState(list.length - 1 - RENDER_LIMIT)
  const scrollToBottom = () =>
    (ref.current.scrollTop = ref.current.scrollHeight)

  useEffect(() => {
    const refCurrent = ref.current
    const onScroll = () => {
      if (refCurrent.scrollTop === 0) {
        const lower = count - RENDER_LIMIT < 0 ? 0 : count - RENDER_LIMIT
        setCount(lower)
        ref.current.scrollTop = 100
      }
    }
    refCurrent && refCurrent.addEventListener('scroll', onScroll)
    return () => {
      refCurrent && refCurrent.removeEventListener('scroll', onScroll)
    }
  }, [count])

  useEffect(() => {
    ref?.current && scrollToBottom()
  }, [list])

  return (
    <Container ref={ref}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <button onClick={scrollToBottom}>Scroll to bottom</button>
              {list
                .slice(count, list.length - 1)
                .map(({ body, id, idx }, i) => (
                  <Draggable key={id} draggableId={id} index={i}>
                    {provided => (
                      <Item
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <button onClick={() => handleDeleteItem(id)}>
                          delete
                        </button>
                        {`${idx}. ${body}`}
                      </Item>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  )
}

export default List
