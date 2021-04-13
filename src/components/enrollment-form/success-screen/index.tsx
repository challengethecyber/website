import React, { useEffect, createRef } from "react"

import lottie from "lottie-web"
import checkmark from "./animations/checkmark.json"

type ISuccessScreenProps = {}

const SuccessScreen = ({}: ISuccessScreenProps) => {
  let animationContainer = createRef<any>()

  useEffect(() => {
    if (animationContainer) {
      const anim = lottie.loadAnimation({
        container: animationContainer!.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: checkmark,
      })
      return () => anim.destroy() // optional clean up for unmounting
    }
  }, [animationContainer])

  return (
    <div className="flex flex-col space-y-6 justify-center h-full">
      <div
        className="h-48 fill-current text-orange-500"
        ref={animationContainer}
      />
      <div className="flex flex-col">
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
