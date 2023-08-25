import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import {
  RenderRichTextData,
  ContentfulRichTextGatsbyReference,
  renderRichText,
} from "gatsby-source-contentful/rich-text"

import { richTextOptions } from "const/richTextOptions"

export interface IHeroProps {
  data: {
    title: string
    subtitle: RenderRichTextData<ContentfulRichTextGatsbyReference>
    heroImage: {
      localFile: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
      description: string
    }
  }
}

const Hero = ({ data }: IHeroProps) => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl flex flex-col">
                <span className="block xl:inline">{data.title}</span>
                <span className="block text-orange-500 xl:inline">
                  Challenge the Cyber
                </span>
              </h1>
              <div className="mt-3 text-base text-justify text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                {renderRichText(data.subtitle, richTextOptions)}
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <GatsbyImage
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          image={data.heroImage.localFile.childImageSharp.gatsbyImageData}
          alt={data.heroImage.description}
          loading="eager"
        />
      </div>
    </div>
  )
}

export default Hero

export const query = graphql`
  fragment Lander on ContentfulLander {
    heroImage {
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
      description
    }
    title
    subtitle {
      raw
    }
  }
`
