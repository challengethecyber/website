import React from "react"

import { graphql, Node, NodeInput } from "gatsby"

import SEO from "../components/seo"
import Hero from "../sections/hero"
import Testimonial from "../sections/testimonial"
import Content from "../sections/content"
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
  }
}

const IndexPage = ({ data }: IQueryProps) => {
  console.log("Index: ", data)
  return (
    <div>
      <SEO title="Home" />
      <Hero data={data.lander} />
      {/* <Testimonial /> */}
      <Content data={data.about} />
      <Blog data={data.news.nodes} />
      <Logos />
      <Footer />
      <EnrollmentSlideOver />
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
    news: allContentfulNews(limit: 3, sort: { fields: date }) {
      nodes {
        ...News
      }
    }
  }
`
