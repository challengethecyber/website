import { EnvelopeIcon } from "@heroicons/react/24/solid"
import Page from "components/page"
import { graphql, PageProps } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import React from "react"

// Some TypeScript hacking to get the TeamMember auto-generated type
type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

type TeamMember = ArrayElement<
  Queries.TeamPageQuery["allContentfulTeamMember"]["nodes"]
>

const TeamMember = ({
  id,
  firstName,
  lastName,
  biography,
  emailAddress,
  photo,
}: Partial<TeamMember>) => {
  return (
    <li key={id}>
      <div className="space-y-4">
        <div className="aspect-w-3! aspect-h-2! rounded-lg">
          <GatsbyImage
            imgClassName="rounded-lg object-cover shadow-lg"
            image={photo!.localFile!.childImageSharp!.gatsbyImageData}
            alt={firstName!}
            loading="eager"
          />
        </div>
        <div className="text-lg font-medium leading-6 flex items-center">
          <h3>{`${firstName} ${lastName}`}</h3>
          <a
            href={`mailto:${emailAddress}`}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Email</span>
            <EnvelopeIcon className="ml-2 h-5 w-5" />
          </a>
          {/* <p className="text-indigo-600">{person.role}</p> */}
        </div>
        <div className="text-lg">
          <p className="text-gray-500">{biography?.biography}</p>
        </div>
      </div>
    </li>
  )
}

const TeamPage = ({ data }: PageProps<Queries.TeamPageQuery>) => {
  return (
    <Page title="Team">
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8 lg:py-8">
          <div className="space-y-5 sm:space-y-4">
            <div>
              <h2 className="text-base text-orange-500 font-semibold tracking-wide uppercase">
                Team
              </h2>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Wie zijn wij?
              </h2>
            </div>
            <p className="text-xl text-gray-500 text-justify">
              Een diverse mix van studenten en mensen die werkzaam zijn in de
              private en publieke sector, allemaal samen met dezelfde passie -
              jonge mensen enthousiasmeren over cybersecurity en hen de middelen
              bieden om te excelleren in het vakgebied.
            </p>
          </div>
          <ul
            role="list"
            className="mt-6 lg:mt-12 space-y-12 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8"
          >
            {data.allContentfulTeamMember.nodes.map(person => (
              <TeamMember key={person.id} {...person} />
            ))}
          </ul>
        </div>
      </div>
    </Page>
  )
}

export default TeamPage

export const query = graphql`
  query TeamPage {
    allContentfulTeamMember(filter: { node_locale: { eq: "nl" } }) {
      nodes {
        id
        firstName
        lastName
        biography {
          biography
        }
        photo {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        emailAddress
      }
    }
  }
`
