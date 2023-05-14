import React from "react"

import { graphql, Link } from "gatsby"

import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

import {
  RenderRichTextData,
  ContentfulRichTextGatsbyReference,
  renderRichText,
} from "gatsby-source-contentful/rich-text"

const options = {
  renderText: (text: string) => <span>{text}</span>,
}

export interface INewsCardsProps {
  data: [
    {
      type: string
      title: string
      author: string
      date: string
      newsPath: string
      content: RenderRichTextData<ContentfulRichTextGatsbyReference>
      picture: {
        localFile: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData
          }
        }
        description: string
      }
    }
  ]
}

const NewsCards = ({ data }: INewsCardsProps) => {
  return (
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3"></div>
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            Nieuws
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Kijk ook eens op onze Twitter &amp; Instagram voor meer nieuws en
            updates!
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {data.map(news => (
            <Link
              key={news.title}
              to={news.newsPath}
              className="block mt-2 overflow-hidden shadow-lg lg:overflow-visible"
            >
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden lg:transform lg:transition-all lg:hover:scale-105">
                <div className="flex-shrink-0">
                  <GatsbyImage
                    className="h-48 w-full object-cover"
                    image={
                      news.picture.localFile.childImageSharp.gatsbyImageData
                    }
                    alt={news.picture.description}
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-900 sm:truncate">
                      {news.title}
                    </p>
                    <div className="relative mt-3 text-base text-gray-500 max-h-32 line-clamp-5">
                      <div className="absolute h-8 bottom-0 w-full bg-gradient-to-t from-white"></div>
                      {renderRichText(news.content, options)}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {news.author}
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={news.date}>
                          {new Date(news.date).toLocaleDateString()}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewsCards

export const query = graphql`
  fragment News on ContentfulNews {
    author
    title
    date
    content {
      raw
    }
    newsPath: gatsbyPath(filePath: "/news/{ContentfulNews.title}")
    picture {
      description
      localFile {
        childImageSharp {
          gatsbyImageData(width: 400)
        }
      }
    }
  }
`
