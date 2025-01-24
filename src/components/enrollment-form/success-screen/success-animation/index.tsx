import React, { useEffect, useRef } from "react"
import lottie from "lottie-web"
import checkmark from "./animations/checkmark.json"

export default function ChevronDownBouncing() {
  const animationContainer = useRef()

  useEffect(() => {
    lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: checkmark,
    })
  }, [])

  return (
    <div
      className="h-48 fill-current text-orange-500"
      ref={animationContainer}
    />
  )
}
