import React, { ReactNode } from "react"
import { Transition } from "@headlessui/react"

import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline"

export interface IBannerProps {
  show: boolean
  onHide: () => void
  shortText: string
  longText: string
  actions: ReactNode | ReactNode[]
}

const Banner = ({
  show,
  shortText,
  longText,
  onHide,
  actions,
}: IBannerProps) => (
  <Transition
    className="bg-orange-500 transform"
    show={show}
    leave="transition ease-in duration-200"
    leaveFrom="translate-y-0"
    leaveTo="-translate-y-24"
  >
    <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between flex-wrap">
        <div className="w-0 flex-1 flex items-center">
          <span className="flex p-2 rounded-lg bg-orange-600">
            <SpeakerphoneIcon className="h-6 w-6 text-white" />
          </span>
          <p className="ml-3 font-medium text-white truncate">
            <span className="md:hidden">{shortText}</span>
            <span className="hidden md:inline">{longText}</span>
          </p>
        </div>
        <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto inline-flex">
          {actions}
        </div>
        <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
          <button
            type="button"
            className="-mr-1 flex p-2 rounded-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
            onClick={onHide}
          >
            <span className="sr-only">Dismiss</span>
            <XIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  </Transition>
)

export default Banner
