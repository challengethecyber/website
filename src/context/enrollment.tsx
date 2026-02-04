import EnrollmentSlideOver from "components/enrollment-form"
import React, { FunctionComponent, createContext, useState } from "react"
import {
  FlagIcon,
  InformationCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline"

import Banner from "components/banner"
import { Link } from "gatsby"

interface ICtfEnrollmentContextProps {
  isCtfEnrollmentOpen: boolean
  setShowCtfEnrollmentSlideOver: any
}

export const CtfEnrollmentContext = createContext<
  Partial<ICtfEnrollmentContextProps>
>({})

export const CtfEnrollmentProvider: FunctionComponent = ({ children }) => {
  const [showCtfEnrollmentSlideOver, setShowCtfEnrollmentSlideOver] =
    useState(false)
  const [showCtfEnrollmentPopup, setShowCtfEnrollmentPopup] = useState(true)

  const isCtfEnrollmentOpen = process.env.GATSBY_ENROLLMENT_OPEN === "true"

  return (
    <CtfEnrollmentContext.Provider
      value={{
        isCtfEnrollmentOpen,
        setShowCtfEnrollmentSlideOver,
      }}
    >
      <Banner
        show={isCtfEnrollmentOpen && showCtfEnrollmentPopup}
        shortText="Meld je aan voor de Challenge the Cyber CTF!"
        longText="De aanmelding voor de Challenge the Cyber CTF 2026 sluit eind maart, meld je snel aan!"
        onHide={() => setShowCtfEnrollmentPopup(false)}
        canHide={false}
        icon={<FlagIcon className="h-6 w-6 text-white" />}
        actions={[
          <Link
            key="moreInfoButton"
            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-50 bg-orange-400 hover:bg-orange-450 w-full sm:w-auto mr-4"
            to="/ctf"
          >
            <InformationCircleIcon className="h-6 w-6" />
            <span className="block sm:hidden ml-2">Meer info</span>
            <span className="hidden sm:block ml-2">Meer informatie</span>
          </Link>,
          <button
            key="signUpButton"
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-xs text-sm font-medium text-orange-500 bg-white hover:bg-orange-50 w-full sm:w-auto cursor-pointer"
            onClick={() => {
              setShowCtfEnrollmentSlideOver(true)
            }}
          >
            <ArrowRightCircleIcon className="h-6 w-6" />
            <span className="block sm:hidden ml-2">Aanmelden</span>
            <span className="hidden sm:block ml-2">Nu aanmelden</span>
          </button>,
        ]}
      />
      {children}
      <EnrollmentSlideOver
        showEnrollmentSlideOver={showCtfEnrollmentSlideOver}
        setShowEnrollmentSlideOver={setShowCtfEnrollmentSlideOver}
      />
    </CtfEnrollmentContext.Provider>
  )
}
