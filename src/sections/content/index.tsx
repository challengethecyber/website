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
    [BLOCKS.PARAGRAPH]: (_node: any, children: any) => (
      <p className="mb-4">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_node: any, children: any) => (
      <ul className="list-disc mb-4 ml-8">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (_node: any, children: any) => {
      return <li>{children}</li>
    },
    [INLINES.HYPERLINK]: (node: any, children: any) => {
      if (node.data.uri.includes("youtube.com/embed")) {
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

export interface IContentProps {
  data: {
    link: string
    title: string
    content: RenderRichTextData<ContentfulRichTextGatsbyReference>
  }
}

const Content = ({ data }: IContentProps) => (
  <div className="relative bg-white overflow-hidden">
    <Shapes />
    <div className="relative px-4 sm:px-6 lg:px-8">
      <div className="text-lg max-w-prose mx-auto">
        <h1 className="mb-8">
          <span className="block text-base text-center text-orange-500 font-semibold tracking-wide uppercase">
            {data.link || ""}
          </span>
          <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {data.title}
          </span>
        </h1>
        <div className="text-gray-500">
          {renderRichText(data.content, options)}
        </div>
      </div>
      <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto"></div>
    </div>
  </div>
)

export default Content

export const query = graphql`
  fragment Content on ContentfulContent {
    link
    title
    content {
      raw
    }
  }
`
