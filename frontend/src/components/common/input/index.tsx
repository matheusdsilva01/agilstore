import { InputHTMLAttributes, useId } from "react"

type InputProps = {
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = (props: InputProps) => {
  const id = useId()
  return (
    <div className="mb-4.5 w-full">
      {props.label && (
        <label
          htmlFor={id}
          className="mb-3 block text-sm font-medium text-black dark:text-white"
        >
          {props.label}
        </label>
      )}
      <input
        className="w-full rounded-md border border-zinc-400 bg-transparent px-5 py-3 outline-none transition-all focus:border-zinc-600 active:border-zinc-600"
        id={id}
        type="text"
        {...props}
      />
    </div>
  )
}
