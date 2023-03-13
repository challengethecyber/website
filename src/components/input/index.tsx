import React, { useState } from "react"
import { FieldError, UseFormRegisterReturn } from "react-hook-form"

import { XCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid"

interface IInputProps {
  className?: string
  type?: string
  label: string
  name: string
  onChange: UseFormRegisterReturn["onChange"]
  warnCondition?: (x: any) => string
  autoComplete?: string
  error?: FieldError
}

const Input = React.forwardRef<any, IInputProps>(
  (
    {
      className = "",
      type = "text",
      label,
      error,
      onChange,
      autoComplete = "",
      warnCondition,
      name,
    },
    ref
  ) => {
    const [warning, setWarning] = useState("")

    return (
      <div className={`w-full ${className}`}>
        <label className="block text-sm font-medium text-gray-900">
          {label}
        </label>
        <input
          className={`mt-1 py-3 px-4 block w-full shadow-sm text-sm rounded-md border-none bg-gray-100 focus:outline-none transition duration-75 ease-linear focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-400 focus:border-red-500"
              : "focus:ring-orange-400 focus:border-orange-400"
          }`}
          onChange={e => {
            if (warnCondition) {
              setWarning(warnCondition(e.target.value))
            }

            onChange(e)
          }}
          name={name}
          ref={ref}
          type={type}
          autoComplete={autoComplete}
        />
        {warnCondition && warning !== "" && (
          <div className="flex mt-2">
            <ExclamationTriangleIcon className="flex-shrink-0 h-5 w-5 text-orange-500" />
            <p className="ml-2 text-sm text-orange-500">{warning}</p>
          </div>
        )}
        {error && (
          <div className="flex mt-2">
            <XCircleIcon className="flex-shrink-0 h-5 w-5 text-red-500" />
            <p className="ml-2 text-sm text-red-500">{error.message}</p>
          </div>
        )}
      </div>
    )
  }
)

export default Input
