import React, { ReactNode } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import {
  RenderRichTextData,
  ContentfulRichTextGatsbyReference,
  renderRichText,
} from "gatsby-source-contentful/rich-text"
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types"

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline"

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => {
      return <span className="font-bold">{text}</span>
    },
    [MARKS.ITALIC]: (text: ReactNode) => {
      return <span className="italic">{text}</span>
    },
  },
  renderNode: {
    // eslint-disable-next-line react/display-name
    [BLOCKS.PARAGRAPH]: (_node: any, children: any) => (
      <p className="mb-4">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_node: any, children: any) => <h2>{children}</h2>,
    [BLOCKS.HEADING_3]: (_node: any, children: any) => <h3>{children}</h3>,
    // eslint-disable-next-line react/display-name
    [BLOCKS.UL_LIST]: (_node: any, children: any) => (
      <ul className="list-disc mb-4 ml-8">{children}</ul>
    ),
    // eslint-disable-next-line react/display-name
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
  },
}

export interface IAboutPageProps {
  data: {
    generalInformation: RenderRichTextData<ContentfulRichTextGatsbyReference>
    bestuurders: [
      {
        lastName: string
        firstName: string
        emailAddress: string
        role: string
        photo: {
          localFile: {
            childImageSharp: {
              gatsbyImageData: IGatsbyImageData
            }
          }
        }
      }
    ]
    policyPlan: {
      file: {
        url: string
      }
    }
  }
}

const About = ({ data }: IAboutPageProps) => (
  <div className="overflow-hidden">
    <div className="relative max-w-7xl mx-auto py-4 md:py-8 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
        <div className="relative">
          <h2 className="text-base text-orange-500 font-semibold tracking-wide uppercase">
            About
          </h2>
          <h1 className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900">
            Challenge the Cyber bestuur
          </h1>
        </div>
      </div>
      <div className="mt-8 flex flex-col lg:gap-8">
        <div className="mt-8 lg:mt-0">
          <div className="">
            <div className="flex mx-auto gap-16">
              <div className="max-w-2xl">
                {renderRichText(data.generalInformation, options)}
              </div>
              <ul role="list" className="flex flex-col gap-6">
                {data.bestuurders.map(person => (
                  <li key={person.emailAddress}>
                    <div className="flex items-center gap-x-6">
                      <div className="h-20 w-20">
                        <GatsbyImage
                          imgClassName="h-20 w-20 rounded-full"
                          image={
                            person.photo!.localFile!.childImageSharp!
                              .gatsbyImageData
                          }
                          alt={person.firstName!}
                          loading="eager"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                          {person.firstName + " " + person.lastName}
                        </h3>
                        <p className="text-sm font-semibold leading-6 text-orange-600">
                          {person.role}
                        </p>
                        <p>{person.emailAddress}</p>
                      </div>
                    </div>
                  </li>
                ))}
                <li>
                  <div>
                    Het volledige bestuur is per email ook bereikbaar via
                    <a href="mailto:bestuur@challengethecyber.nl">
                      &nbsp;bestuur@challengethecyber.nl
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 lg:mt-0">
          <Link to={"https://" + data.policyPlan.file.url}>
            <button
              type="button"
              className="inline-flex items-center gap-x-2 rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Download beleidsplan
              <ArrowDownTrayIcon
                className="-mr-0.5 h-5 w-5"
                aria-hidden="true"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default About

export const query = graphql`
  fragment AboutPage on ContentfulAboutPage {
    generalInformation {
      raw
    }
    bestuurders {
      lastName
      firstName
      emailAddress
      role
      photo {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    policyPlan {
      file {
        url
      }
    }
  }
`
