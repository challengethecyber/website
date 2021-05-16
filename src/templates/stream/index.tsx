import React from "react"
import { Link } from "gatsby"

import Page from "components/page"

const Stream = () => {
  const streamChannelId = process.env.GATSBY_EVENT_STREAM_CHANNEL_ID

  return (
    <Page title="Livestream">
      <div className="bg-white px-4 py-6 sm:px-6 max-w-7xl mx-auto">
        <span className="mt-2 mb-6 block text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Livestream
        </span>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className=" aspect-w-16 aspect-h-9">
            <iframe
              className="overflow-hidden -z-10w-full h-full"
              src={`https://www.youtube.com/embed/live_stream?channel=${streamChannelId}&autoplay=1&controls=0&rel=0`}
              frameBorder="0"
              allow="autoplay"
            />
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Stream
