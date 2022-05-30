type ButtonProps = {
  type:"email" | "password" | "text"
}

export default function Input({type}:ButtonProps) {
  return (
    <input type={type} />
  )
}
