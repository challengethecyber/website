import React from "react"
import { graphql } from "gatsby"
import EventCard from "./event-card"

interface ICalendarProps {
  data: [
    {
      id: string
      eventName: string
      startDate: string
      endDate: string
      shortDescription: {
        shortDescription: string
      }
    }
  ]
}

export default function Calendar({ data }: ICalendarProps) {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          <div className="space-y-5 sm:space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Aankomende evenementen
            </h2>
            <p className="text-xl text-gray-500">
              Challenge the Cyber organiseert het hele jaar door evenementen
              voor jonge cybersecurity-enthousiastelingen. Zet ze in je agenda
              zodat je niets mist!
            </p>
          </div>
          <div className="lg:col-span-2">
            <ul role="list" className="space-y-2 lg:space-y-4">
              {data.map(
                ({ id, eventName, startDate, endDate, shortDescription }) => (
                  <EventCard
                    key={id}
                    eventName={eventName}
                    startDate={startDate}
                    endDate={endDate}
                    shortDescription={shortDescription?.shortDescription}
                  />
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  fragment CalendarEvent on ContentfulCalendarEvent {
    id
    eventName
    startDate
    endDate
    shortDescription {
      shortDescription
    }
  }
`
