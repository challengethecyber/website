import React, { useState } from "react"

import { graphql, Node, NodeInput } from "gatsby"

import SEO from "../components/seo"
import Hero from "../sections/hero"
import CTA from "../sections/cta"
import Testimonial from "../sections/testimonial"
import About from "../sections/about"
import Blog from "../sections/blog"
import Logos from "../sections/logos"
import Footer from "../sections/footer"
import EnrollmentSlideOver from "components/EnrollmentSlideOver"

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
  const isEnrollmentOpen = process.env.GATSBY_ENROLLMENT_OPEN === "true"
  const [showEnrollmentSlideOver, setShowEnrollmentSlideOver] = useState(false)

  return (
    <div>
      <SEO title="Home" />
      <Hero data={data.lander} />
      {isEnrollmentOpen && (
        <CTA setShowEnrollmentSlideOver={setShowEnrollmentSlideOver} />
      )}
      {/* <Testimonial /> */}
      <About data={data.about} />
      <Blog data={data.news.nodes} />
      <Logos data={data.sponsors} />
      <Footer />
      {isEnrollmentOpen && (
        <EnrollmentSlideOver
          showEnrollmentSlideOver={showEnrollmentSlideOver}
          setShowEnrollmentSlideOver={setShowEnrollmentSlideOver}
        />
      )}
    </div>
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
