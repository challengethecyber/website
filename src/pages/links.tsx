import React from "react"

import { graphql, Node, NodeInput } from "gatsby"

import SEO from "../components/seo"
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
      <SEO title="Links" />
      <Content data={data.allContentfulContent.nodes[0]} />
      <Footer />
    </div>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allContentfulContent(filter: { link: { eq: "Links" } }) {
      nodes {
        ...Content
      }
    }
  }
`
