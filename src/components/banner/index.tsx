import React, { ReactNode } from "react"
import { Transition } from "@headlessui/react"
import cx from "classnames"

import { MegaphoneIcon, XMarkIcon } from "@heroicons/react/24/outline"

export interface IBannerProps {
  show: boolean
  canHide?: boolean
  onHide?: () => void
  shortText: string
  longText: string
  actions: ReactNode | ReactNode[]
  color?: "primary" | "purple"
  icon?: ReactNode
}

const Banner = ({
  show,
  shortText,
  longText,
  canHide = true,
  onHide,
  actions,
  color = "primary",
  icon,
}: IBannerProps) => (
  <Transition
    className={cx("transform border-t-2 border-gray-50 border-opacity-20", {
      "bg-orange-500": color === "primary",
      "bg-indigo-500": color === "purple",
    })}
    show={show}
    leave="transition ease-in duration-200"
    leaveFrom="translate-y-0"
    leaveTo="-translate-y-24"
  >
    <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex-1 flex items-center">
          <span className="flex p-2 rounded-lg bg-black bg-opacity-20">
            {icon ?? <MegaphoneIcon className="h-6 w-6 text-white" />}
          </span>
          <p className="ml-3 font-medium text-white truncate">
            <span className="md:hidden">{shortText}</span>
            <span className="hidden md:inline">{longText}</span>
          </p>
        </div>
        <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto inline-flex">
          {actions}
        </div>
        {canHide && (
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              className="-mr-1 flex p-2 rounded-md hover:bg-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
              onClick={onHide}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  </Transition>
)

export default Banner
