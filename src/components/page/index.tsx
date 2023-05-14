import React, { useState, useEffect, FC, PropsWithChildren } from "react"
import {
  InformationCircleIcon,
  PlayIcon,
  PuzzlePieceIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline"

import SEO from "./seo"
import Header from "./navigation"
import Footer from "./footer"
import Banner from "components/banner"
import { Link } from "gatsby"

import DiscordIcon from "src/assets/discord.svg"
import InstagramIcon from "src/assets/instagram.svg"
import YoutubeIcon from "src/assets/youtube.svg"
import TwitterIcon from "src/assets/twitter.svg"

import TrainingMissionIcon from "assets/icons8-compass.svg"

export const DISCORD_BANNER_PARAM_NAME = "show-discord-banner"
export const STORIES_BANNER_PARAM_NAME = "show-stories-banner"

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

const Page: FC<PropsWithChildren<IPageProps>> = ({
  title,
  hideHeader = false,
  children,
}) => {
  const [showDiscordBanner, setShowDiscordBanner] = useState<boolean>(false)
  const [showStoriesBanner, setShowStoriesBanner] = useState<boolean>(false)

  // Hydrate state
  useEffect(() => {
    localStorage.getItem(DISCORD_BANNER_PARAM_NAME) !== null
      ? setShowDiscordBanner(
          process.env.GATSBY_SHOW_DISCORD_BANNER === "true" &&
            localStorage.getItem(DISCORD_BANNER_PARAM_NAME) === "1"
        )
      : setShowDiscordBanner(process.env.GATSBY_SHOW_DISCORD_BANNER === "true")

    localStorage.getItem(STORIES_BANNER_PARAM_NAME) !== null
      ? setShowStoriesBanner(
          process.env.GATSBY_SHOW_STORIES_BANNER === "true" &&
            localStorage.getItem(STORIES_BANNER_PARAM_NAME) === "1"
        )
      : setShowStoriesBanner(process.env.GATSBY_SHOW_STORIES_BANNER === "true")
  }, [])

  useBannerPersistenceEffect(
    showDiscordBanner,
    DISCORD_BANNER_PARAM_NAME,
    process.env.GATSBY_SHOW_DISCORD_BANNER === "true"
  )

  useBannerPersistenceEffect(
    showStoriesBanner,
    STORIES_BANNER_PARAM_NAME,
    process.env.GATSBY_SHOW_STORIES_BANNER === "true"
  )

  return (
    <>
      <SEO title={title} />
      <Header />
      <Banner
        show={process.env.GATSBY_EVENT_LIVE === "true"}
        shortText={`CTC CTF ${new Date().getFullYear()} is nu live!`}
        longText={`Challenge the Cyber CTF ${new Date().getFullYear()} is nu live!`}
        canHide={false}
        actions={[
          process.env.GATSBY_EVENT_CTF_URL && (
            <a
              key="ctf-link"
              href={process.env.GATSBY_EVENT_CTF_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-orange-500 bg-white border border-transparent rounded-md shadow-sm hover:bg-opacity-90 sm:w-auto"
            >
              <PuzzlePieceIcon className="w-6 h-6 mr-2" />
              Speel CTF
            </a>
          ),
        ]}
      />
      <Banner
        show={process.env.GATSBY_TM_LIVE === "true"}
        shortText={`TM ${new Date().getFullYear()} is live!`}
        longText={`Challenge the Cyber Training Mission ${new Date().getFullYear()} is live!`}
        canHide={false}
        icon={<TrainingMissionIcon className="w-6 h-6 fill-white" />}
        actions={[
          process.env.GATSBY_TM_URL && (
            <a
              key="ctf-link"
              href={process.env.GATSBY_TM_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-orange-500 bg-white border border-transparent rounded-md shadow-sm hover:bg-opacity-90 sm:w-auto"
            >
              <PuzzlePieceIcon className="w-6 h-6 mr-2" />
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
              key="discord-link"
              href={process.env.GATSBY_DISCORD_INVITE_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-indigo-500 bg-white border border-transparent rounded-md shadow-sm hover:bg-opacity-90 sm:w-auto"
            >
              <DiscordIcon className="w-5 h-5 mr-2 fill-indigo-500" />
              Discord
            </a>
          ),
        ]}
        color="purple"
      />
      <Banner
        show={showStoriesBanner}
        shortText={`Watch ECSC 2022 stories!`}
        longText={`Watch European Cyber Security Challenge 2022 stories!`}
        onHide={() => setShowStoriesBanner(false)}
        actions={[
          process.env.GATSBY_STORIES_PATH_LIVEBLOG && (
            <Link
              to={process.env.GATSBY_STORIES_PATH_LIVEBLOG}
              className="flex items-center justify-center w-full px-4 py-2 mx-1 text-sm font-medium text-orange-500 bg-white border border-transparent rounded-md shadow-sm hover:bg-opacity-90 sm:w-auto"
            >
              <NewspaperIcon className="w-6 h-6 lg:mr-2" />
              <span className="hidden lg:inline">Liveblog</span>
            </Link>
          ),
          process.env.GATSBY_STORIES_LINK_INSTAGRAM && (
            <a
              key="instagram-link"
              href={process.env.GATSBY_STORIES_LINK_INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-full px-4 py-2 mx-1 text-sm font-medium text-orange-500 bg-white border border-transparent rounded-md shadow-sm hover:bg-opacity-90 sm:w-auto"
            >
              <InstagramIcon className="w-6 h-6 lg:mr-2 fill-orange-500" />
              <span className="hidden lg:inline">Watch stories</span>
            </a>
          ),
          process.env.GATSBY_STORIES_LINK_TWITTER && (
            <a
              key="twitter-link"
              href={process.env.GATSBY_STORIES_LINK_TWITTER}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-full px-4 py-2 mx-1 text-sm font-medium text-orange-500 bg-white border border-transparent rounded-md shadow-sm hover:bg-opacity-90 sm:w-auto"
            >
              <TwitterIcon className="w-6 h-6 lg:mr-2 fill-orange-500" />
              <span className="hidden lg:inline">Follow twitter</span>
            </a>
          ),
          process.env.GATSBY_STORIES_LINK_YOUTUBE && (
            <a
              key="youtube-link"
              href={process.env.GATSBY_STORIES_LINK_YOUTUBE}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-full px-4 py-2 mx-1 text-sm font-medium text-orange-500 bg-white border border-transparent rounded-md shadow-sm hover:bg-opacity-90 sm:w-auto"
            >
              <YoutubeIcon className="w-6 h-6 lg:mr-2 fill-orange-500" />
              <span className="hidden lg:inline">View trailer</span>
            </a>
          ),
        ]}
        color="primary"
      />
      {children}
      <Footer />
    </>
  )
}

export default Page
