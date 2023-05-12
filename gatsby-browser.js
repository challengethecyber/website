/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import React from "react"

import "./src/styles/global.css"

import { CtfEnrollmentProvider } from "./src/context/enrollment"

export const wrapRootElement = ({ element }) => (
  <CtfEnrollmentProvider>{element}</CtfEnrollmentProvider>
)

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}
