import React, { useContext } from "react"

import { graphql } from "gatsby"

import Page from "components/page"

import Hero from "components/sections/hero"
import CTFCallToAction from "components/sections/ctf-cta"
import About from "components/sections/about"
import NewsCards from "components/sections/news-cards"
import Logos from "components/sections/logos"
import { CtfEnrollmentContext } from "context/enrollment"
import Calendar from "components/sections/calendar"
import Newsletter from "components/sections/newsletter"
import TMCallToAction from "components/sections/tm-cta"

interface IQueryProps {
  data: {
    lander: any
    about: any
    news: {
      nodes: any
    }
    calendar: {
      nodes: any
    }
    sponsors: any
  }
}

const IndexPage = ({ data }: IQueryProps) => {
  const { isCtfEnrollmentOpen, setShowCtfEnrollmentSlideOver } =
    useContext(CtfEnrollmentContext)

  const isTrainingMissionLive =
    process.env.GATSBY_TM_LIVE === "true" &&
    process.env.ENROLLMENT_OPEN === "false"

  return (
    <Page title="Home" hideHeader>
      <Hero data={data.lander} />
      {isCtfEnrollmentOpen && (
        <CTFCallToAction
          setShowEnrollmentSlideOver={setShowCtfEnrollmentSlideOver}
        />
      )}
      {isTrainingMissionLive && <TMCallToAction />}
      <Calendar data={data.calendar.nodes} />
      <About data={data.about} />
      <Newsletter />
      <NewsCards data={data.news.nodes} />
      <Logos data={data.sponsors} />
    </Page>
  )
}

export default IndexPage

export const query = graphql`{
  lander: contentfulLander {
    ...Lander
  }
  about: contentfulAbout {
    ...About
  }
  news: allContentfulNews(
    limit: 3
    sort: {date: DESC}
    filter: {node_locale: {eq: "nl"}}
  ) {
    nodes {
      ...News
    }
  }
  calendar: allContentfulCalendarEvent(
    limit: 3
    sort: {startDate: ASC}
    filter: {node_locale: {eq: "nl"}}
  ) {
    nodes {
      ...CalendarEvent
    }
  }
  sponsors: contentfulSponsors {
    ...Sponsors
  }
}`
