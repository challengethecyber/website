import React, { ReactNode } from "react"
import { FieldError } from "react-hook-form"

import { XCircleIcon } from "@heroicons/react/20/solid"

interface IToggleProps {
  onChange: (newValue: boolean) => void
  value: boolean
  mainText: string
  subText: ReactNode
  error?: FieldError
}

const Toggle = ({
  onChange,
  value,
  mainText,
  subText,
  error,
}: IToggleProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          className={`relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 ${
            value ? "bg-orange-500" : "bg-gray-200"
          }`}
          onClick={() => onChange(!value)}
        >
          <span
            className={`pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
              value ? "translate-x-5" : "translate-x-0"
            }`}
          >
            <span
              className={`absolute inset-0 h-full w-full flex items-center justify-center transition-opacity ${
                value
                  ? "opacity-0 ease-out duration-100"
                  : "opacity-100 ease-in duration-200"
              }`}
              aria-hidden="true"
            >
              <svg
                className="bg-white h-3 w-3 text-gray-400"
                fill="none"
                viewBox="0 0 12 12"
              >
                <path
                  d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              className={`absolute inset-0 h-full w-full flex items-center justify-center transition-opacity ${
                value
                  ? "opacity-100 ease-in duration-200"
                  : "opacity-0 ease-out duration-100"
              }`}
              aria-hidden="true"
            >
              <svg
                className="bg-white h-3 w-3 text-orange-500"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
              </svg>
            </span>
          </span>
        </button>
        <span className="grow flex flex-col ml-6" id="availability-label">
          <span className="text-sm font-medium text-gray-900">{mainText}</span>
          <span className="text-sm text-gray-500">{subText}</span>
        </span>
      </div>

      {error && (
        <div className="flex mt-2">
          <XCircleIcon className="shrink-0 h-5 w-5 text-red-500" />
          <p className="ml-2 text-sm text-red-500">{error.message}</p>
        </div>
      )}
    </div>
  )
}

export default Toggle
