import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

const Container = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  button:first-of-type {
    margin-right: 0.25rem;
  }
`

const Form = ({ onReset, onSubmit }) => {
  const { register, handleSubmit } = useForm()

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <input
        name="number"
        placeholder="# of items"
        type="number"
        defaultValue={0}
        ref={register}
      />
      <Buttons>
        <button type="submit">Generate</button>
        <button type="reset" onClick={onReset}>
          Reset
        </button>
      </Buttons>
    </Container>
  )
}

export default Form
