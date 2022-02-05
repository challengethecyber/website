import React from "react"

import { graphql } from "gatsby"

import Page from "components/page"
import News from "templates/news"

interface IQueryProps {
  data: {
    contentfulNews: any
  }
}

const NewsPost: React.FC<IQueryProps> = props => {
  return (
    <Page title={props.data.contentfulNews.title}>
      <News data={props.data.contentfulNews} />
    </Page>
  )
}
export const query = graphql`
  query ($id: String) {
    contentfulNews(id: { eq: $id }) {
      ...AllNews
    }
  }
`

export default NewsPost
