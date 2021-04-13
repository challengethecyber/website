import React, { FunctionComponent } from "react"

import SEO from "./seo"
import Header from "./header"
import Footer from "./footer"

interface IPageProps {
  title: string
  hideHeader?: boolean
}

const Page: FunctionComponent<IPageProps> = ({
  title,
  hideHeader = false,
  children,
}) => {
  return (
    <>
      <SEO title={title} />
      {!hideHeader && <Header />}
      {children}
      <Footer />
    </>
  )
}

export default Page
