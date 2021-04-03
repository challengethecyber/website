import React from "react"

import { graphql } from "gatsby"

import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

import {
  RenderRichTextData,
  ContentfulRichTextGatsbyReference,
  renderRichText,
} from "gatsby-source-contentful/rich-text"

import { BLOCKS } from "@contentful/rich-text-types"

const options = {
  renderMark: {},
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="mb-4">{children}</p>
    ),
  },
}

export interface IBlogProps {
  data: [
    {
      type: string
      title: string
      author: string
      date: string
      content: RenderRichTextData<ContentfulRichTextGatsbyReference>
      picture: {
        gatsbyImageData: IGatsbyImageData
        description: string
      }
    }
  ]
}

const Blog = ({ data }: IBlogProps) => {
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
            Neem voor meer over ons ook vooral een kijkje op onze Twitter &amp;
            Instagram!
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {data.map(news => (
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixqx=79TiEXealR&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
                  alt=""
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-orange-500">
                    <a href="#" className="hover:underline">
                      {news.type}
                    </a>
                  </p>
                  <a href="#" className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">
                      {news.title}
                    </p>
                    <div className="mt-3 text-base text-gray-500 max-h-32 overflow-hidden">
                      {/* todo ellipsis */}
                      {renderRichText(news.content, options)}
                    </div>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      <a href="#" className="hover:underline">
                        {news.author}
                      </a>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={news.date}>
                        {new Date(news.date).toLocaleDateString()}
                      </time>
                      {/* <span aria-hidden="true">&middot;</span>
                      <span>6 min read</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog

export const query = graphql`
  fragment News on ContentfulNews {
    author
    type
    title
    date
    content {
      raw
    }
    picture {
      description
      gatsbyImageData(width: 400)
    }
  }
`
