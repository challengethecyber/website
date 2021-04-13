import React, { useContext } from "react"

import { graphql } from "gatsby"

import Page from "components/page"

import Hero from "components/sections/hero"
import CTA from "components/sections/cta"
import About from "components/sections/about"
import Blog from "components/sections/blog"
import Logos from "components/sections/logos"
import { EnrollmentContext } from "../context/enrollment"

interface IQueryProps {
  data: {
    lander: any
    about: any
    news: {
      nodes: any
    }
    sponsors: any
  }
}

const IndexPage = ({ data }: IQueryProps) => {
  const { isEnrollmentOpen, setShowEnrollmentSlideOver } = useContext(
    EnrollmentContext
  )

  return (
    <Page title="Home" hideHeader>
      <Hero data={data.lander} />
      {isEnrollmentOpen && (
        <CTA setShowEnrollmentSlideOver={setShowEnrollmentSlideOver} />
      )}
      <About data={data.about} />
      <Blog data={data.news.nodes} />
      <Logos data={data.sponsors} />
    </Page>
  )
}

export default IndexPage

export const query = graphql`
  query {
    lander: contentfulLander {
      ...Lander
    }
    about: contentfulAbout {
      ...About
    }
    news: allContentfulNews(limit: 3, sort: { fields: date, order: DESC }) {
      nodes {
        ...News
      }
    }
    sponsors: contentfulSponsors {
      ...Sponsors
    }
  }
`
