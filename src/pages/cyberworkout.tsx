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

const CwPage = ({ data }: IQueryProps) => {
  return (
    <Page title="Cyber Workout">
      <Content data={data.allContentfulContent.nodes[0]} />
    </Page>
  )
}

export default CwPage

export const query = graphql`
  query {
    allContentfulContent(filter: { link: { eq: "Cyber Workout" } }) {
      nodes {
        ...Content
      }
    }
  }
`
