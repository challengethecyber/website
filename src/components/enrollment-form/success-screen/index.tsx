import React, { lazy, useEffect, createRef } from "react"

const SuccessAnimation = lazy(() => import("./success-animation"))

type ISuccessScreenProps = {}

const SuccessScreen = ({}: ISuccessScreenProps) => {
  const isSSR = typeof window === "undefined"

  return (
    <div className="flex flex-col space-y-6 justify-center h-full">
      <div className="flex flex-col">
        {!isSSR && (
          <React.Suspense fallback={<div />}>
            <SuccessAnimation />
          </React.Suspense>
        )}
        <span className="font-medium text-lg text-center">
          Leuk dat je meedoet!
        </span>
        <span className="font-medium text-gray-700 text-sm text-center">
          Je ontvangt een e-mail ter bevestiging van je aanmelding.
        </span>
      </div>
    </div>
  )
}

export default SuccessScreen
