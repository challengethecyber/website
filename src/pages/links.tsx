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

const LinksPage = ({ data }: IQueryProps) => {
  return (
    <Page title="Links">
      <Content data={data.allContentfulContent.nodes[0]} />
    </Page>
  )
}

export default LinksPage

export const query = graphql`
  query {
    allContentfulContent(
      filter: { link: { eq: "Links" }, node_locale: { eq: "nl" } }
    ) {
      nodes {
        ...Content
      }
    }
  }
`
