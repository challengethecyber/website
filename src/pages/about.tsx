import React from "react"

import { PageProps, graphql } from "gatsby"

import Page from "components/page"
import About from "templates/about"

interface IQueryProps {
  data: {
    allContentfulAboutPage: {
      nodes: any
    }
  }
}

const AboutPage = ({ data }: PageProps<Queries.AboutPageQuery>) => {
  return (
    <Page title="Nieuws">
      {data.allContentfulAboutPage.nodes.map((about: any, index: number) => {
        return (
          <div key={index} className="divide-solid">
            <About data={about} />
          </div>
        )
      })}
    </Page>
  )
}

export default AboutPage

export const query = graphql`
  query {
    allContentfulAboutPage(filter: { node_locale: { eq: "nl" } }) {
      nodes {
        ...AboutPage
      }
    }
  }
`
