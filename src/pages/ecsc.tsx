import React from "react"

import { graphql } from "gatsby"

import Page from "components/page"
import Content from "components/content"

interface IQueryProps {
  data: {
    allContentfulContent: {
      nodes: any
    }
  }
}

const EcscPage = ({ data }: IQueryProps) => {
  return (
    <Page title="ECSC">
      <Content data={data.allContentfulContent.nodes[0]} />
    </Page>
  )
}

export default EcscPage

export const query = graphql`
  query {
    allContentfulContent(
      filter: { link: { eq: "ECSC" }, node_locale: { eq: "nl" } }
    ) {
      nodes {
        ...Content
      }
    }
  }
`
