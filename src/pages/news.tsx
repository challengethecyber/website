import React from "react"

import { graphql, Node, NodeInput } from "gatsby"

import SEO from "../components/seo"
import Header from "../components/header"
import News from "../sections/news"
import Footer from "../sections/footer"

interface IQueryProps {
  data: {
    allContentfulNews: {
      nodes: any
    }
  }
}

const IndexPage = ({ data }: IQueryProps) => {
  return (
    <div>
      <SEO title="Nieuws" />
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white">
          <Header />
        </div>
      </div>
      {data.allContentfulNews.nodes.map((news: any, index: number) => {
        console.log(index, index % 2 === 0)
        return (
          <div className="divide-solid">
            <News data={news} textLeft={index % 2 === 0} />
          </div>
        )
      })}
      <Footer />
    </div>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allContentfulNews(sort: { fields: date, order: DESC }) {
      nodes {
        ...AllNews
      }
    }
  }
`
