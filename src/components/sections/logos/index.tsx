import React from "react"
import { graphql } from "gatsby"
import {
  RenderRichTextData,
  ContentfulRichTextGatsbyReference,
  renderRichText,
} from "gatsby-source-contentful/rich-text"

import { richTextOptions } from "const/richTextOptions"

export interface ILogosProps {
  data: {
    title: string
    description: RenderRichTextData<ContentfulRichTextGatsbyReference>
    callToAction: string
    logos: [
      {
        localFile: {
          publicURL: string
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
            <h2
              id="vrienden"
              className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
            >
              {data.title}
            </h2>
            <div className="mt-3 max-w-3xl text-lg text-gray-500">
              {renderRichText(data.description, richTextOptions)}
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
          <div className="mt-8 grid grid-cols-2 gap-1.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
            {data.logos
              .map(logo => (
                <div
                  key={logo.description}
                  className="col-span-1 h-28 flex flex-col gap-2 justify-center items-center bg-gray-50"
                >
                  {/* Show JCR as platform sponsor */}
                  {logo.description.includes("jointcyberrange") && (
                    <span className="uppercase tracking-wider text-xs text-gray-500">
                      Platform Sponsor
                    </span>
                  )}
                  <a href={logo.description}>
                    <img
                      className="h-16 max-w-48"
                      src={logo.localFile.publicURL}
                      alt={logo.title}
                    />
                  </a>
                </div>
              ))
              .sort(() => Math.random() - 0.5)}
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
      localFile {
        publicURL
      }
    }
  }
`
