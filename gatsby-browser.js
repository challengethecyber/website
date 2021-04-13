/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import React from "react"

import { EnrollmentProvider } from "./src/context/enrollment"

import "./src/styles/global.css"

export const wrapRootElement = ({ element }) => (
  <EnrollmentProvider>{element}</EnrollmentProvider>
)
