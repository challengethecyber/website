import React, { useState } from "react"

import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid"

interface IContextCardProps {
  mainText: string
  subText: string
  isAlert?: boolean
}

const ContextCard = ({
  mainText,
  subText,
  isAlert = false,
}: IContextCardProps) => {
  return (
    <div className="rounded-md bg-gray-100 p-4">
      <div className="flex">
        <div className="shrink-0">
          {isAlert ? (
            <ExclamationTriangleIcon className="h-5 w-5 text-orange-600" />
          ) : (
            <InformationCircleIcon className="h-5 w-5 text-orange-600" />
          )}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-gray-900">{mainText}</h3>
          <div className="mt-2 text-sm text-gray-700">
            <p>{subText}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContextCard
