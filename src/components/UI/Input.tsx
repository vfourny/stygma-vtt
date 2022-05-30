import styled from 'styled-components'

type InputProps = {
  type?:"email" | "password" | "text",
  placeholder?:string
}
const InputStyled = styled.input`
border: 1px solid red;
`

export default function Input({type="text"}:InputProps) {
  return (
    <InputStyled type={type} />
  )
}
