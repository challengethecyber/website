import React, { useContext } from "react"

import { graphql, Node, NodeInput } from "gatsby"

import { EnrollmentContext } from "/src/context/enrollment"

import Page from "components/page"
import Content from "components/content"

interface IQueryProps {
  data: {
    allContentfulContent: {
      nodes: any
    }
  }
}

const CtfPage = ({ data }: IQueryProps) => {
  const { setShowEnrollmentSlideOver } = useContext(EnrollmentContext)

  return (
    <Page title="CTF">
      <Content data={data.allContentfulContent.nodes[0]} />
      <div className="">
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Klaar om te spelen?</span>
            <span className="block text-orange-500">Meld je nu aan.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                type="button"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600"
                onClick={() => setShowEnrollmentSlideOver(true)}
              >
                Aanmelden
              </button>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default CtfPage

export const query = graphql`
  query {
    allContentfulContent(filter: { link: { eq: "CTF" } }) {
      nodes {
        ...Content
      }
    }
  }
`
