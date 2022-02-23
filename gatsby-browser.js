/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import "./src/styles/global.css"

import React from "react"

import { CtfEnrollmentProvider } from "./src/context/enrollment"

export const wrapRootElement = ({ element }) => (
  <CtfEnrollmentProvider>{element}</CtfEnrollmentProvider>
)
