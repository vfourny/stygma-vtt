import styled from 'styled-components'

type ButtonProps = {
  type?:"submit" | "reset" | "button",
  label:string,
  onClick?:()=>void
}
const ButtonStyled = styled.button`
`

export default function Button({type="button",label,onClick}:ButtonProps) {
  return (
    <ButtonStyled type={type} onClick={onClick}>{label}</ButtonStyled>
  )
}
