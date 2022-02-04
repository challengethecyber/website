import React from "react"

import { graphql } from "gatsby"

import Page from "components/page"
import News from "components/sections/news"
import { INewsFields } from "types/contentful"

interface IQueryProps {
  data: {
    contentfulNews: INewsFields
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
