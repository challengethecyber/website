import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import {
  RenderRichTextData,
  ContentfulRichTextGatsbyReference,
  renderRichText,
} from "gatsby-source-contentful/rich-text"

import { richTextOptions } from "const/richTextOptions"

export interface IAboutProps {
  data: {
    catchTitle: string
    title: string
    about: RenderRichTextData<ContentfulRichTextGatsbyReference>
    picture: {
      localFile: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
      description: string
    }
  }
}

export default function About({ data }: IAboutProps) {
  const imageRight = false
  return (
    <div className="relative bg-white">
      <div className="relative pt-12 pb-16 px-4 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2 z-10">
        <div
          className={`${
            imageRight ? "lg:col-start-1 lg:pr-8" : "lg:col-start-2 lg:pl-8"
          } `}
        >
          <div className="text-base max-w-prose mx-auto lg:mr-auto lg:ml-0">
            <h2 className="leading-6 text-orange-500 font-semibold tracking-wide uppercase">
              {data.catchTitle}
            </h2>
            <h3 className="my-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {data.title}
            </h3>
            <div className="text-gray-500 text-justify">
              {renderRichText(data.about, richTextOptions)}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-0">
        <div
          className={`lg:absolute lg:inset-y-0 ${
            imageRight ? "lg:right-0" : "lg:left-0"
          } lg:w-1/2`}
        >
          <GatsbyImage
            className="h-56 w-full object-cover lg:absolute lg:h-full"
            image={data.picture.localFile.childImageSharp.gatsbyImageData}
            alt={data.picture.description}
            loading="eager"
          />
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  fragment About on ContentfulAbout {
    catchTitle
    title
    about {
      raw
    }
    picture {
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
      description
    }
  }
`
