import React from "react"
import { graphql, PageProps } from "gatsby"

import Shapes from "./shapes"
import Schedule from "./schedule"

import {
  RenderRichTextData,
  ContentfulRichTextGatsbyReference,
  renderRichText,
} from "gatsby-source-contentful/rich-text"

import { BLOCKS, INLINES, Inline, Block } from "@contentful/rich-text-types"

const options = {
  renderMark: {},
  renderNode: {
    [BLOCKS.HEADING_2]: (_node: any, children: any) => <h2>{children}</h2>,
    [BLOCKS.HEADING_3]: (_node: any, children: any) => <h3>{children}</h3>,
    [BLOCKS.HEADING_4]: (_node: any, children: any) => <h4>{children}</h4>,
    [BLOCKS.HEADING_5]: (_node: any, children: any) => <h5>{children}</h5>,
    [BLOCKS.HEADING_6]: (_node: any, children: any) => <h6>{children}</h6>,
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
      return (
        <a href={node.data.uri} className="text-orange-500 font-medium">
          {children}
        </a>
      )
    },
    [INLINES.EMBEDDED_ENTRY]: (node: any) => {
      return (
        <div className="not-prose">
          <Schedule schedule={node.data.target.agenda} />
        </div>
      )
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
        <div className="text-gray-500 prose lg:prose-lg max-w-full">
          {renderRichText(data.content, options)}
        </div>
      </div>
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
      references {
        ...EventSchedule
      }
    }
  }

  fragment EventSchedule on ContentfulEventSchedule {
    id
    contentful_id
    agenda {
      time
      description
    }
  }
`
