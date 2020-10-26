import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { lorem, random } from 'faker'
import { Form, List } from '../../components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 60vh;
  width: 35vw;
`

const InverseList = () => {
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem('list') || '[]')
  )

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  const onSubmit = ({ number }) => {
    if (Number(number) > 0) {
      setList([
        ...list,
        ...[...Array(Number(number))]
          .reduce(
            (a, _, i) => [
              ...a,
              {
                body: lorem.paragraph(),
                id: random.uuid(),
                idx: i,
              },
            ],
            []
          )
          .reverse(),
      ])
    }
  }

  const handleDelete = id => setList(list.filter(x => x.id !== id))

  const handleReset = () => {
    setList([])
  }

  const updateListOrder = (startIndex, endIndex) => {
    const [removed] = list.splice(startIndex, 1)
    list.splice(endIndex, 0, removed)
    setList(list)
  }

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    updateListOrder(result.source.index, result.destination.index)
  }

  return (
    <Container>
      <Form onSubmit={onSubmit} onReset={handleReset} />
      {!!list?.length && (
        <List
          list={list}
          handleDeleteItem={handleDelete}
          onDragEnd={onDragEnd}
        />
      )}
    </Container>
  )
}

export default InverseList
