import React, { FC } from "react"
import { useStaticQuery, graphql } from "gatsby"

interface ISEOProps {
  description?: string
  lang?: string
  meta?: Array<
    { name: string; content: string } | { property: string; content: string }
  >
  title: string
}

const SEO: FC<ISEOProps> = ({
  description = "",
  lang = "en",
  meta = [],
  title,
}) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={site.siteChangedata?.author || ""}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {meta.map(m => (
        <meta key={`meta-${m.name || m.property}`} {...m} />
      ))}
    </>
  )
}

export default SEO
