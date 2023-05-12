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

const PrivacyStatementPage = ({ data }: IQueryProps) => {
  return (
    <Page title="Privacyverklaring">
      <Content data={data.allContentfulContent.nodes[0]} />
    </Page>
  )
}

export default PrivacyStatementPage

export const query = graphql`
  query {
    allContentfulContent(
      filter: { title: { eq: "Privacyverklaring" }, node_locale: { eq: "nl" } }
    ) {
      nodes {
        ...Content
      }
    }
  }
`
