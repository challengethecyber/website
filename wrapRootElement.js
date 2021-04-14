import React from "react"

import { EnrollmentProvider } from "./src/context/enrollment"

const wrapRootElement = ({ element }) => (
  <EnrollmentProvider>{element}</EnrollmentProvider>
)

export default wrapRootElement
