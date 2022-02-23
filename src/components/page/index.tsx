import React, { useState, useEffect, FunctionComponent } from "react"

import {
  InformationCircleIcon,
  PlayIcon,
  PuzzleIcon,
} from "@heroicons/react/outline"
import SEO from "./seo"
import Header from "./header"
import Footer from "./footer"
import Banner from "components/banner"
import { Link } from "gatsby"

import DiscordIcon from "src/assets/discord.svg"

export const DISCORD_BANNER_PARAM_NAME = "show-discord-banner"

interface IPageProps {
  title: string
  hideHeader?: boolean
}

// Helper function for banner persistence
const useBannerPersistenceEffect = (
  stateParam: boolean,
  paramName: string,
  baseCondition: boolean
) =>
  useEffect(() => {
    if (baseCondition) {
      localStorage.setItem(paramName, stateParam ? "1" : "0")
    }
  }, [stateParam])

const Page: FunctionComponent<IPageProps> = ({
  title,
  hideHeader = false,
  children,
}) => {
  const [showDiscordBanner, setShowDiscordBanner] = useState<boolean>(false)

  // Hydrate state
  useEffect(() => {
    localStorage.getItem(DISCORD_BANNER_PARAM_NAME) !== null
      ? setShowDiscordBanner(
          process.env.GATSBY_SHOW_DISCORD_BANNER === "true" &&
            localStorage.getItem(DISCORD_BANNER_PARAM_NAME) === "1"
        )
      : setShowDiscordBanner(process.env.GATSBY_SHOW_DISCORD_BANNER === "true")
  }, [])

  useBannerPersistenceEffect(
    showDiscordBanner,
    DISCORD_BANNER_PARAM_NAME,
    process.env.GATSBY_SHOW_DISCORD_BANNER === "true"
  )

  return (
    <>
      <SEO title={title} />
      <Banner
        show={process.env.GATSBY_EVENT_LIVE === "true"}
        shortText={`CTC ${new Date().getFullYear()} is live!`}
        longText={`Challenge the Cyber ${new Date().getFullYear()} is nu live!`}
        canHide={false}
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
        show={process.env.GATSBY_TM_LIVE === "true"}
        shortText={`TM ${new Date().getFullYear()} is live vanaf 1 maart!`}
        longText={`Challenge the Cyber Training Mission ${new Date().getFullYear()} is live vanaf 1 maart!`}
        canHide={false}
        actions={[
          <Link
            key="stream-link"
            to="/live"
            className="mr-4 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-orange-500 bg-white hover:bg-orange-50 w-full sm:w-auto"
          >
            <InformationCircleIcon className="h-6 w-6 mr-2" />
            Meer informatie
          </Link>,
          process.env.GATSBY_TM_URL && (
            <a
              key="ctf-link"
              href={process.env.GATSBY_TM_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-orange-500 bg-white hover:bg-opacity-90 w-full sm:w-auto"
            >
              <PuzzleIcon className="h-6 w-6 mr-2" />
              Spelen
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
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-500 bg-white hover:bg-opacity-90 w-full sm:w-auto"
            >
              <DiscordIcon className="h-5 w-5 mr-2 fill-indigo-500" />
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
