import React from "react"

import Page from "components/page"

const NotFoundPage = () => (
  <Page title="404: Not found">
    <div className="prose text-center">
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </Page>
)

export default NotFoundPage
