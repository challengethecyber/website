import React, { FC } from "react"
import { DateTime } from "luxon"
import ical, { ICalCalendar } from "ical-generator"
import slugify from "slugify"
import { ArrowDownTrayIcon as DownloadIcon } from "@heroicons/react/24/outline"

interface IEventCardProps {
  eventName: string
  startDate: string
  endDate: string
  shortDescription?: string
}

const downloadIcal = (eventName: string, icalEvent: ICalCalendar) => {
  const element = document.createElement("a")
  const file = new Blob([icalEvent.toString()], {
    type: "text/calendar",
  })
  element.href = URL.createObjectURL(file)
  element.download = `${slugify(eventName)}.ics`
  document.body.appendChild(element) // Required for this to work in FireFox
  element.click()
}

const EventCard: FC<IEventCardProps> = ({
  startDate,
  endDate,
  eventName,
  shortDescription,
}) => {
  const parsedStartDate = DateTime.fromISO(startDate).setLocale("nl")
  const parsedEndDate = DateTime.fromISO(endDate).setLocale("nl")

  const icalItem = ical({ name: "Challenge the Cyber" })

  icalItem.createEvent({
    start: parsedStartDate,
    end: parsedEndDate,
    summary: eventName,
    description: shortDescription,
    url: "https://www.challengethecyber.nl/",
  })

  return (
    <li className="p-2 rounded-lg shadow-sm bg-white">
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="shrink-0 flex flex-col w-16 md:w-20 rounded-md overflow-hidden border border-gray-200">
          <div className="bg-orange-500 p-px text-white text-center text-xs md:text-sm">
            <span>{parsedStartDate.toFormat("LLLL")}</span>
          </div>
          <div className="p-1 flex flex-col items-center">
            <span className="text-base md:text-lg font-semibold -mb-1">
              {parsedStartDate.toFormat("dd")}
            </span>
            <span className="text-orange-500 text-xs md:text-sm">
              {parsedStartDate.toFormat("cccc")}
            </span>
          </div>
        </div>

        <div className="space-y-2 overflow-hidden flex-1">
          <h4 className="flex-1 text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold tracking-tight truncate">
            {eventName}
          </h4>
          {shortDescription && (
            <p className="text-gray-600 truncate">{shortDescription}</p>
          )}
        </div>
        <DownloadIcon
          aria-label="Add to calendar"
          className="h-6 w-6 text-orange-500 cursor-pointer mr-2 md:mr-4"
          onClick={() => downloadIcal(eventName, icalItem)}
        />
      </div>
    </li>
  )
}

export default EventCard
