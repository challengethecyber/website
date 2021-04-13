import React from "react"

import { graphql, Node, NodeInput } from "gatsby"

import SEO from "../components/seo"
import Header from "../components/header"
import Content from "../sections/content"
import Footer from "../sections/footer"

interface IQueryProps {
  data: {
    allContentfulContent: {
      nodes: any
    }
  }
}

const PrivacyStatement = ({ data }: IQueryProps) => {
  return (
    <div>
      <SEO title="Privacyverklaring" />
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white">
          <Header />
        </div>
      </div>
      <Content data={data.allContentfulContent.nodes[0]} />
      <Footer />
    </div>
  )
}

export default PrivacyStatement

export const query = graphql`
  query {
    allContentfulContent(filter: { title: { eq: "Privacyverklaring" } }) {
      nodes {
        ...Content
      }
    }
  }
`
