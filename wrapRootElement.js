import React from "react"

import { CtfEnrollmentProvider } from "./src/context/enrollment"

const wrapRootElement = ({ element }) => (
  <CtfEnrollmentProvider>{element}</CtfEnrollmentProvider>
)

export default wrapRootElement
