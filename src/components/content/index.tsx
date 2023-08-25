import React from "react"
import { graphql, PageProps } from "gatsby"
import {
  RenderRichTextData,
  ContentfulRichTextGatsbyReference,
  renderRichText,
} from "gatsby-source-contentful/rich-text"
import { INLINES } from "@contentful/rich-text-types"

import Shapes from "./shapes"
import Schedule from "./schedule"

import { richTextOptions } from "const/richTextOptions"

const options = {
  ...richTextOptions,
  renderNode: {
    ...richTextOptions.renderNode,
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
        <h1 className="my-8">
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
