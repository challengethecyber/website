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

const CyberBootcampPage = ({ data }: IQueryProps) => {
  return (
    <Page title="Cyberbootcamp">
      <Content data={data.allContentfulContent.nodes[0]} />
    </Page>
  )
}

export default CyberBootcampPage

export const query = graphql`
  query {
    allContentfulContent(filter: { link: { eq: "Cyberbootcamp" } }) {
      nodes {
        ...Content
      }
    }
  }
`
