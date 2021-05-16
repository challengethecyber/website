import EnrollmentSlideOver from "components/enrollment-form"
import React, { FunctionComponent, createContext, useState } from "react"

import Banner from "components/banner"

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
      <Banner
        show={isEnrollmentOpen && showEnrollmentPopup}
        shortText="De aanmeldingen voor de CTF zijn open!"
        longText="De aanmeldingen voor de Challenge the Cyber CTF op 29 mei zijn
              open!"
        onHide={() => setShowEnrollmentPopup(false)}
        actions={
          <button
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-orange-500 bg-white hover:bg-orange-50 w-full sm:w-auto"
            onClick={() => {
              setShowEnrollmentPopup(false)
              setShowEnrollmentSlideOver(true)
            }}
          >
            Nu aanmelden
          </button>
        }
      />
      {children}
      <EnrollmentSlideOver
        showEnrollmentSlideOver={showEnrollmentSlideOver}
        setShowEnrollmentSlideOver={setShowEnrollmentSlideOver}
      />
    </EnrollmentContext.Provider>
  )
}
