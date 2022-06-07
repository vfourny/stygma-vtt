import styled from 'styled-components'

type InputProps = {
  type?:"email" | "password" | "text",
  placeholder?:string
}
const InputStyled = styled.input`
border: 1px solid;
`

const Input:React.FC<InputProps> = ({type="text",placeholder})=> {
  return (
    <InputStyled type={type} placeholder={placeholder} />
  )
}

export default Input
