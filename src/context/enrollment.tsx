import EnrollmentSlideOver from "components/enrollment-form"
import React, { FunctionComponent, createContext, useState } from "react"

import Banner from "components/banner"

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
        shortText="De aanmeldingen voor de CTF zijn open!"
        longText="De aanmeldingen voor de Challenge the Cyber CTF op 14 mei zijn
              open!"
        onHide={() => setShowCtfEnrollmentPopup(false)}
        actions={
          <button
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-orange-500 bg-white hover:bg-orange-50 w-full sm:w-auto"
            onClick={() => {
              setShowCtfEnrollmentPopup(false)
              setShowCtfEnrollmentSlideOver(true)
            }}
          >
            Nu aanmelden
          </button>
        }
      />
      {children}
      <EnrollmentSlideOver
        showEnrollmentSlideOver={showCtfEnrollmentSlideOver}
        setShowEnrollmentSlideOver={setShowCtfEnrollmentSlideOver}
      />
    </CtfEnrollmentContext.Provider>
  )
}
