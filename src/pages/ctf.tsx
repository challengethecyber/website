import React from "react"

import { graphql, Node, NodeInput } from "gatsby"

import Page from "components/page"
import Content from "components/content"

interface IQueryProps {
  data: {
    allContentfulContent: {
      nodes: any
    }
  }
}

const CtfPage = ({ data }: IQueryProps) => {
  return (
    <Page title="CTF">
      <Content data={data.allContentfulContent.nodes[0]} />
    </Page>
  )
}

export default CtfPage

export const query = graphql`
  query {
    allContentfulContent(filter: { link: { eq: "CTF" } }) {
      nodes {
        ...Content
      }
    }
  }
`
