/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async function ({ actions, graphql }) {
  if (process.env.GATSBY_EVENT_LIVE === "true") {
    actions.createPage({
      path: "/live",
      component: require.resolve("./src/templates/stream/index.tsx"),
    })
  }
}
