import React, { useState, FunctionComponent } from "react"

import { PlayIcon, PuzzleIcon } from "@heroicons/react/outline"
import SEO from "./seo"
import Header from "./header"
import Footer from "./footer"
import Banner from "components/banner"
import { Link } from "gatsby"

import DiscordIcon from "src/assets/icons8-discord.svg"

interface IPageProps {
  title: string
  hideHeader?: boolean
}

const Page: FunctionComponent<IPageProps> = ({
  title,
  hideHeader = false,
  children,
}) => {
  const [showEventBanner, setShowEventBanner] = useState<boolean>(
    process.env.GATSBY_EVENT_LIVE === "true"
  )

  const [showDiscordBanner, setShowDiscordBanner] = useState<boolean>(
    process.env.GATSBY_SHOW_DISCORD_BANNER === "true"
  )

  return (
    <>
      <SEO title={title} />
      <Banner
        show={showEventBanner}
        shortText={`CTC ${new Date().getFullYear()} is live!`}
        longText={`Challenge the Cyber ${new Date().getFullYear()} is nu live!`}
        onHide={() => setShowEventBanner(false)}
        actions={[
          <Link
            key="stream-link"
            to="/live"
            className="mr-4 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-orange-500 bg-white hover:bg-orange-50 w-full sm:w-auto"
          >
            <PlayIcon className="h-6 w-6 mr-2" />
            Kijk live
          </Link>,
          process.env.GATSBY_EVENT_CTF_URL && (
            <a
              key="ctf-link"
              href={process.env.GATSBY_EVENT_CTF_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-orange-500 bg-white hover:bg-opacity-90 w-full sm:w-auto"
            >
              <PuzzleIcon className="h-6 w-6 mr-2" />
              Speel CTF
            </a>
          ),
        ]}
      />
      <Banner
        show={showDiscordBanner}
        shortText={`Kom bij onze Discord!`}
        longText={`Heb je interesse in cybersecurity en de evenementen van Challenge the Cyber? Kom bij onze Discord!`}
        onHide={() => setShowDiscordBanner(false)}
        actions={[
          process.env.GATSBY_DISCORD_INVITE_LINK && (
            <a
              key="ctf-link"
              href={process.env.GATSBY_DISCORD_INVITE_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-purple-500 bg-white hover:bg-opacity-90 w-full sm:w-auto"
            >
              <DiscordIcon className="h-6 w-6 mr-2" />
              Discord
            </a>
          ),
        ]}
        color="purple"
      />
      {!hideHeader && <Header />}
      {children}
      <Footer />
    </>
  )
}

export default Page
