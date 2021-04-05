import React from "react"
import { FieldError } from "react-hook-form"

import { XCircleIcon } from "@heroicons/react/solid"

interface ISelectProps {
  className?: string
  options: string[]
  label: string
  name: string
  onChange: any
  error?: FieldError | undefined
}

const Select = React.forwardRef<any, ISelectProps>(
  ({ className = "", options, label, error, onChange, name }, ref) => (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-900">{label}</label>
      <select
        className={`mt-1 block w-full pl-3 pr-10 py-3 px-4 text-sm border-none bg-gray-100 shadow-sm rounded-md transition duration-75 ease-linear focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-400 focus:border-red-500"
            : "focus:ring-orange-400 focus:border-orange-400"
        }`}
        onChange={onChange}
        name={name}
        ref={ref}
      >
        {options.map((o: string) => (
          <option>{o}</option>
        ))}
      </select>
      {error && (
        <div className="flex mt-2">
          <XCircleIcon className="flex-shrink-0 h-5 w-5 text-red-500" />
          <p className="ml-2 text-sm text-red-500">{error.message}</p>
        </div>
      )}
    </div>
  )
)

export default Select
