import React, { FC } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, Link } from "gatsby"
import PropTypes from "prop-types"

interface ICardProps {
  name: string
  slug: string
  summary: string
  thumbnail: any
}

const Card: FC<ICardProps> = ({ name, slug, summary, thumbnail }) => {
  return (
    <div className="bg-white h-full shadow-sm rounded-md overflow-hidden group">
      <Link to={`/${slug}`}>
        <div className="group-hover:opacity-75 transition duration-150 ease-in-out">
          {/* <StaticImage fluid={thumbnail.localFile.childImageSharp.fluid} alt={name} /> */}
          <GatsbyImage image={thumbnail.gatsbyImageData} alt={name} />
        </div>
        <div className="p-4 sm:p-5">
          <h1 className="sm:text-lg text-gray-900 font-semibold">{name}</h1>
          <p className="text-sm sm:text-base text-gray-700">{summary}</p>
        </div>
      </Link>
    </div>
  )
}

export default Card

// TODO: Fix image fetch https://www.gatsbyjs.com/docs/reference/release-notes/image-migration-guide/#fluid
export const query = graphql`
  fragment PortfolioCard on ContentfulPortfolio {
    id
    name
    slug
    thumbnail {
      gatsbyImageData(
        layout: FULL_WIDTH
        placeholder: BLURRED
        formats: [AUTO, WEBP]
      )
    }
    summary
  }
`
