const path = require("path")

require("dotenv").config()
const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided.",
  )
}

module.exports = {
  siteMetadata: {
    title: `Challenge the Cyber`,
    description: `Challenge the Cyber organiseert cybersecurity events voor scholieren en studenten. De jaarlijkse Challenge the Cyber CTF, het Cyberbootcamp en de uitzending naar de European Cybersecurity Challenge zijn de belangrijkste pijlers, met daaromheen trainings- en netwerkactiviteiten.`,
    author: `Challenge the Cyber`,
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        components: path.join(__dirname, "src/components"),
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    {
      resolve: "gatsby-plugin-svgr",
      options: {
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `challenge-the-cyber`,
        short_name: `ctc`,
        start_url: `/`,
        icon: `src/assets/ctc-satellite.svg`,
        background_color: `#ffffff`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true,
      },
    },
    `gatsby-plugin-gatsby-cloud`,
  ],
}
