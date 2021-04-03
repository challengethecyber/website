import React from "react"
import { FieldError } from "react-hook-form"

import { XCircleIcon } from "@heroicons/react/solid"

interface IInputProps {
  type?: string
  label: string
  name: string
  onChange: any
  error?: FieldError | undefined
}

const Input = React.forwardRef<any, IInputProps>(
  ({ type, label, error, onChange, name }, ref) => (
    <div className="w-full">
      <span className="text-sm font-medium text-gray-900"></span>
      <label className="block text-sm font-medium text-gray-900">{label}</label>
      <div className="mt-1">
        <input
          className={`block w-full shadow-sm sm:text-sm rounded-md border-gray-300 focus:ring-orange-400 focus:border-orange-400 ${
            error ? "border-red-300 border-2" : ""
          }`}
          onChange={onChange}
          name={name}
          ref={ref}
          type={type || "text"}
        />
        {error && (
          <div className="flex mt-2">
            <XCircleIcon className="flex-shrink-0 h-5 w-5 text-red-400" />
            <p className="ml-3 text-sm text-red-700">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  )
)

export default Input
