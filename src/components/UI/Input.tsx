import styled from 'styled-components'

type InputProps = {
  type?:"email" | "password" | "text",
  placeholder?:string
}
const InputStyled = styled.input`
border: 1px solid;
`

export default function Input({type="text",name,placeholder}:InputProps) {
  return (
    <InputStyled type={type} name={name} placeholder={placeholder} />
  )
}
