import EnrollmentSlideOver from "components/enrollment-form"
import React, { FunctionComponent, createContext, useState } from "react"
import { Transition } from "@headlessui/react"

import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline"

interface IEnrollmentContextProps {
  isEnrollmentOpen: boolean
  setShowEnrollmentSlideOver: any
}

export const EnrollmentContext = createContext<
  Partial<IEnrollmentContextProps>
>({})

export const EnrollmentProvider: FunctionComponent = ({ children }) => {
  const [showEnrollmentSlideOver, setShowEnrollmentSlideOver] = useState(false)
  const [showEnrollmentPopup, setShowEnrollmentPopup] = useState(true)

  const isEnrollmentOpen = process.env.GATSBY_ENROLLMENT_OPEN === "true"

  return (
    <EnrollmentContext.Provider
      value={{
        isEnrollmentOpen,
        setShowEnrollmentSlideOver,
      }}
    >
      <Transition
        className="bg-orange-500 transform"
        show={isEnrollmentOpen && showEnrollmentPopup}
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
                <span className="md:hidden">
                  De aanmeldingen voor de CTF zijn open!
                </span>
                <span className="hidden md:inline">
                  De aanmeldingen voor de Challenge the Cyber CTF op 29 mei zijn
                  open!
                </span>
              </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <button
                // type="button"
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-orange-500 bg-white hover:bg-orange-50 w-full sm:w-auto"
                onClick={() => {
                  setShowEnrollmentPopup(false)
                  setShowEnrollmentSlideOver(true)
                }}
              >
                Nu aanmelden
              </button>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
              <button
                type="button"
                className="-mr-1 flex p-2 rounded-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                onClick={() => setShowEnrollmentPopup(false)}
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </Transition>
      {children}
      <EnrollmentSlideOver
        showEnrollmentSlideOver={showEnrollmentSlideOver}
        setShowEnrollmentSlideOver={setShowEnrollmentSlideOver}
      />
    </EnrollmentContext.Provider>
  )
}
