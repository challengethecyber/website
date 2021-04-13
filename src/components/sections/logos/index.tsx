import React from "react"

import { graphql } from "gatsby"

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
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a href={node.data.uri} className="text-orange-500 font-medium">
        {children}
      </a>
    ),
    [BLOCKS.UL_LIST]: (_node: any, children: any) => (
      <ul className="list-disc mb-4 ml-8">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (_node: any, children: any) => {
      return <li className="mb-2">{children[0].props.children[0]}</li>
    },
  },
}

export interface ILogosProps {
  data: {
    title: string
    description: RenderRichTextData<ContentfulRichTextGatsbyReference>
    callToAction: string
    logos: [
      {
        file: {
          url: string
        }
        title: string
        description: string
      }
    ]
  }
}

const Logos = ({ data }: ILogosProps) => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {data.title}
            </h2>
            <div className="mt-3 max-w-3xl text-lg text-gray-500">
              {renderRichText(data.description, options)}
            </div>
            <div className="mt-8 sm:flex">
              <div className="rounded-md shadow">
                <a
                  href="mailto:vrienden@challengethecyber.nl"
                  className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600"
                >
                  {data.callToAction}
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
            {data.logos.map(logo => (
              <div
                key={logo.description}
                className="col-span-1 flex justify-center py-8 px-8 bg-gray-50"
              >
                <a href={logo.description}>
                  <img
                    className="max-h-12 h-12"
                    src={logo.file.url}
                    alt={logo.title}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logos

export const query = graphql`
  fragment Sponsors on ContentfulSponsors {
    title
    description {
      raw
    }
    callToAction
    logos {
      title
      description
      file {
        url
      }
    }
  }
`
