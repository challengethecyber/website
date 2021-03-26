import React from "react"

import SEO from "../components/seo"
import Hero from "../components/hero"
import Testimonial from "../components/testimonial"
import Content from "../components/content"
import Blog from "../components/blog"
import Logos from "../components/logos"
import Footer from "../components/footer"

const IndexPage = () => (
  <div>
    <SEO title="Home" />
    <Hero />
    <Testimonial />
    <Content />
    <Blog />
    <Logos />
    <Footer />
  </div>
)

export default IndexPage
