import React from "react"

import { graphql, Node, NodeInput } from "gatsby"

import SEO from "../components/seo"
import Hero from "../sections/hero"
import Testimonial from "../sections/testimonial"
import Content from "../sections/content"
import Blog from "../sections/blog"
import Logos from "../sections/logos"
import Footer from "../sections/footer"

interface IQueryProps {
  data: {
    lander: {
      nodes: any
    }
  }
}

const IndexPage = ({ data }: IQueryProps) => {
  console.log(data)
  return (
    <div>
      <SEO title="Home" />
      <Hero data={data.lander.nodes} />
      <Testimonial />
      <Content />
      <Blog />
      <Logos />
      <Footer />
    </div>
  )
}

export default IndexPage

export const query = graphql`
  query {
    lander: allContentfulLander {
      nodes {
        ...Lander
      }
    }
  }
`
