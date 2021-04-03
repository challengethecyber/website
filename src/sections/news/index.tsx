import React from "react"

import { graphql } from "gatsby"

import Shapes from "./shapes"
import Header from "../../components/header"

import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

import {
  RenderRichTextData,
  ContentfulRichTextGatsbyReference,
  renderRichText,
} from "gatsby-source-contentful/rich-text"

import { BLOCKS, INLINES } from "@contentful/rich-text-types"

const options = {
  renderMark: {},
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="mb-4">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="list-disc mb-4 ml-8">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => {
      console.log("Child: ")
      return <li>{children}</li>
    },
    [INLINES.HYPERLINK]: (node: any, children: any) => {
      if (node.data.uri.includes("youtube.com/embed")) {
        console.log(node)

        return (
          <iframe
            className="w-full lg:max-w-lg h-72"
            src={node.data.uri}
            title="Replaceme"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )
      } else {
        return (
          <a href={node.data.uri} className="text-orange-500 font-medium">
            {children}
          </a>
        )
      }
    },
  },
}

export interface INewsProps {
  textLeft: boolean
  data: {
    type: string
    title: string
    author: string
    date: string
    content: RenderRichTextData<ContentfulRichTextGatsbyReference>
    photographer: string
    picture: {
      gatsbyImageData: IGatsbyImageData
      description: string
    }
  }
}

const News = ({ data, textLeft }: INewsProps) => (
  <div className="overflow-hidden">
    <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="hidden lg:block bg-gray-50 absolute -z-1 top-0 bottom-0 left-3/4 w-screen"></div>
      <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
        <div
          className={`relative ${
            textLeft ? "lg:col-start-1" : "lg:col-start-2"
          }`}
        >
          <h2 className="text-base text-orange-500 font-semibold tracking-wide uppercase">
            {data.type}
          </h2>
          <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {data.title}
          </h3>
        </div>
      </div>
      <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
        <div
          className={`relative lg:row-start-1 ${
            textLeft ? "lg:col-start-2" : "lg:col-start-1"
          }`}
        >
          <svg
            className={`hidden lg:block absolute -z-1 top-0  -mt-20 ${
              textLeft ? "right-0 -mr-20" : "left-0 -ml-20"
            } `}
            width="404"
            height="384"
            fill="none"
            viewBox="0 0 404 384"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="384"
              fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
            />
          </svg>
          <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
            <figure>
              <div className="aspect-w-12 aspect-h-7">
                <GatsbyImage
                  className="rounded-lg shadow-lg object-cover object-center"
                  image={data.picture.gatsbyImageData}
                  alt={data.picture.description}
                />
                {/* <img
                  className="rounded-lg shadow-lg object-cover object-center"
                  src="https://images.unsplash.com/photo-1546913199-55e06682967e?ixlib=rb-1.2.1&auto=format&fit=crop&crop=focalpoint&fp-x=.735&fp-y=.55&w=1184&h=1376&q=80"
                  alt="Whitney leaning against a railing on a downtown street"
                  width="1184"
                  height="1376"
                /> */}
              </div>
              <figcaption className="mt-3 flex text-sm text-gray-500">
                {/* <!-- Heroicon name: solid/camera --> */}
                <svg
                  className="flex-none w-5 h-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="ml-2">{data.photographer}</span>
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="mt-8 lg:mt-0">
          <div
            className={`mt-5 prose prose-orange text-gray-500 mx-auto lg:max-w-none lg:row-start-1 ${
              textLeft ? "lg:col-start-1" : "lg:col-start-2"
            }`}
          >
            {renderRichText(data.content, options)}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default News

export const query = graphql`
  fragment AllNews on ContentfulNews {
    author
    type
    title
    date
    content {
      raw
    }
    photographer
    picture {
      description
      gatsbyImageData
    }
  }
`
