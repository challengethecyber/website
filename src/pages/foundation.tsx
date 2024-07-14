import React from "react"
import { graphql, Link, PageProps } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { ArrowDownTrayIcon, DocumentTextIcon } from "@heroicons/react/20/solid"

import Page from "components/page"

import { richTextOptions } from "const/richTextOptions"

const FoundationPage = ({ data }: PageProps<Queries.FoundationPageQuery>) => {
  const foundationPageData = data.allContentfulFoundationPage.nodes[0]

  return (
    <Page title="Stichting">
      <div className="relative max-w-7xl mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
          <div className="relative">
            <h2 className="text-base text-orange-500 font-semibold tracking-wide uppercase">
              Stichting
            </h2>
            <h1 className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900">
              Challenge the Cyber
            </h1>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex flex-col md:flex-row mx-auto gap-16">
            <div className="flex-1">
              <h4 className="text-xl font-semibold mb-4">
                Algemene informatie
              </h4>
              {foundationPageData.generalInformation &&
                renderRichText(
                  foundationPageData.generalInformation as any,
                  richTextOptions,
                )}
            </div>
            <div className="flex-1">
              <div className="flex flex-col">
                <div>
                  <h4 className="text-xl font-semibold mb-4">Bestuur</h4>
                  <ul role="list" className="flex flex-col gap-6">
                    {foundationPageData.bestuurders?.map((person: any) => (
                      <li key={person.emailAddress}>
                        <div className="flex items-center gap-x-6">
                          <div className="h-20 w-20">
                            <GatsbyImage
                              imgClassName="h-20 w-20 rounded-full"
                              image={
                                person.photo.localFile.childImageSharp
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
                        Het volledige bestuur is ook per e-mail bereikbaar via
                        <a
                          className="font-semibold text-orange-500"
                          href="mailto:bestuur@challengethecyber.nl"
                        >
                          &nbsp;bestuur@challengethecyber.nl
                        </a>
                        .
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="mt-10">
                    <h4 className="text-xl font-semibold mb-2">Documenten</h4>
                    <ul role="list" className="divide-y divide-gray-300">
                      {foundationPageData.files?.map(file => (
                        <li
                          key={file?.id}
                          className="py-2 group hover:cursor-pointer"
                        >
                          <Link
                            className="flex items-center gap-2"
                            to={"https://" + file?.file?.url}
                            target="_blank"
                          >
                            <DocumentTextIcon className="h-5 w-5 text-orange-500" />

                            <span className="text group-hover:underline font-medium text-gray-900">
                              {file?.title}
                            </span>
                            <ArrowDownTrayIcon
                              className="ml-auto h-5 w-5 text-orange-500"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default FoundationPage

export const query = graphql`
  query FoundationPage {
    allContentfulFoundationPage(filter: { node_locale: { eq: "nl" } }) {
      nodes {
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
                gatsbyImageData(placeholder: NONE)
              }
            }
          }
        }
        files {
          id
          title
          file {
            details {
              size
            }
            url
          }
        }
      }
    }
  }
`
