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
    className={cx("transform", {
      "bg-orange-500": color === "primary",
      "bg-indigo-500": color === "purple",
    })}
    show={show}
    leave="transition ease-in duration-200"
    leaveFrom="translate-y-0"
    leaveTo="-translate-y-24"
  >
    <div className="px-3 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center flex-1 max-w-full">
          <span
            className={cx("flex p-2 rounded-lg bg-opacity-20", {
              "bg-orange-700": color === "primary",
              "bg-indigo-700": color === "purple",
            })}
          >
            {icon ?? <MegaphoneIcon className="w-6 h-6 text-white" />}
          </span>
          <p className="ml-3 font-medium text-white truncate">
            <span className="md:hidden">{shortText}</span>
            <span className="hidden md:inline">{longText}</span>
          </p>
        </div>
        <div className="inline-flex shrink-0 order-3 w-full sm:order-2 sm:w-auto">
          {actions}
        </div>
        {canHide && (
          <div className="shrink-0 order-2 sm:order-3 sm:ml-3">
            <button
              type="button"
              className="flex p-2 -mr-1 rounded-md hover:bg-black hover:bg-opacity-10 focus:outline-hidden focus:ring-2 focus:ring-white sm:-mr-2"
              onClick={onHide}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  </Transition>
)

export default Banner
