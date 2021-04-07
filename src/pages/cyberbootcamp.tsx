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

const IndexPage = ({ data }: IQueryProps) => {
  return (
    <div>
      <SEO title="Cyberbootcamp" />
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

export default IndexPage

export const query = graphql`
  query {
    allContentfulContent(filter: { link: { eq: "Cyberbootcamp" } }) {
      nodes {
        ...Content
      }
    }
  }
`
