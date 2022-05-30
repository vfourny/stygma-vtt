import styled from 'styled-components'

type ButtonProps = {
  type?:"submit" | "reset" | "button",
  label:string
}
const ButtonStyled = styled.button`
`

export default function Button({type="button",label}:ButtonProps) {
  return (
    <ButtonStyled type={type}>{label}</ButtonStyled>
  )
}
