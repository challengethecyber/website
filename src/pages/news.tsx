import React from "react"

import { graphql } from "gatsby"

import Page from "components/page"
import News from "templates/news"

interface IQueryProps {
  data: {
    allContentfulNews: {
      nodes: any
    }
  }
}

const NewsPage = ({ data }: IQueryProps) => {
  return (
    <Page title="Nieuws">
      {data.allContentfulNews.nodes.map((news: any, index: number) => {
        return (
          <div key={index} className="divide-solid">
            <News data={news} textLeft={index % 2 === 0} />
          </div>
        )
      })}
    </Page>
  )
}

export default NewsPage

export const query = graphql`{
  allContentfulNews(sort: {date: DESC}) {
    nodes {
      ...AllNews
    }
  }
}`
