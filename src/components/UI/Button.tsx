import styled from 'styled-components'

type ButtonProps = {
  type?:"submit" | "reset" | "button", //ptet mettre en enum
  label:string,
  onClick?:()=>void
}
const ButtonStyled = styled.button`
`

const Button:React.FC<ButtonProps> = ({type="button",label,onClick}) =>{
  return (
    <ButtonStyled type={type} onClick={onClick}>{label}</ButtonStyled>
  )
}

export default Button
