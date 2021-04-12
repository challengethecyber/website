import React from "react"

import { graphql } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

import Header from "../../components/header"

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

export interface IHeroProps {
  data: {
    title: string
    subtitle: RenderRichTextData<ContentfulRichTextGatsbyReference>
    heroImage: {
      gatsbyImageData: IGatsbyImageData
      description: string
    }
  }
}

const Hero = ({ data }: IHeroProps) => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <Header />
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl flex flex-col">
                <span className="block xl:inline">{data.title}</span>
                <span className="block text-orange-500 xl:inline">
                  Challenge the Cyber
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                {renderRichText(data.subtitle, options)}
              </p>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        {/* <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixqx=79TiEXealR&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt=""
        /> */}
        <GatsbyImage
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          image={data.heroImage.gatsbyImageData}
          alt={data.heroImage.description}
        />
      </div>
    </div>
  )
}

export default Hero

export const query = graphql`
  fragment Lander on ContentfulLander {
    heroImage {
      gatsbyImageData(formats: AUTO)
      description
    }
    title
    subtitle {
      raw
    }
  }
`
